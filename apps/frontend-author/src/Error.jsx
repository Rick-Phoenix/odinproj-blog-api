import { useParams } from "react-router-dom";

export default function Error() {
  const { errCode } = useParams();
  return (
    <>
      <h1>Error {errCode}</h1>
    </>
  );
}
