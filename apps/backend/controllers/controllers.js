import { body, validationResult } from "express-validator";
import { checkPassword, genPassword } from "../auth/passwordUtils.js";
import { getUser } from "../prisma/queries.js";

export const signUpValidationChain = [
  body("username")
    .trim()
    .custom((value) => {
      const forbiddenChars = /[<>&'"/\\`]/;
      if (forbiddenChars.test(value)) {
        throw new Error(
          "Username cannot contain characters like <, >, &, \\, /, `, ', \""
        );
      }
      return true;
    })
    .escape()
    .isLength({ min: 4, max: 24 })
    .withMessage("Username must be between 4 and 24 characters."),
  body("email")
    .trim()
    .custom((value) => {
      const forbiddenChars = /[<>&'"/\\`]/;
      if (forbiddenChars.test(value)) {
        throw new Error(
          "Email cannot contain characters like <, >, &, \\, /, `, ', \""
        );
      }
      return true;
    })
    .escape()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number."),
  body("passconfirm").custom((value, { req }) => {
    if (value !== req.body.password)
      throw new Error("The passwords do not match.");
    else return true;
  }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    res.status(200);
  },
];

export async function validateLogin(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (!user) return res.status(400).json("This user does not exist.");
  const { hash, salt } = user;
  const pwCheck = checkPassword(password, hash, salt);
  if (!pwCheck) return res.status(400).json("Incorrect password.");
  res.json(user);
}
