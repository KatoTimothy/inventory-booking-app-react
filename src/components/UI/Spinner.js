import { FaSpinner } from "react-icons/fa";

const Spinner = (props) => {
  return (
    <span {...props}>
      <FaSpinner className="icon-loading" />
    </span>
  );
};

export default Spinner;
