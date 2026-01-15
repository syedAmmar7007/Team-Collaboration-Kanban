const COLUMN_STYLES = {
  todo: "from-blue-600 to-blue-400",
  inProgress: "from-yellow-600 to-yellow-400",
  done: "from-green-600 to-green-400",
};

const ColumnHeader = ({ title, count, columnId }) => {
  return (
    <div
      className={`p-4 rounded-t-xl text-white flex justify-between items-center
                  bg-linear-to-r ${COLUMN_STYLES[columnId]} shadow-md`}
    >
      <h3 className="font-bold text-lg">{title}</h3>
      <span className="bg-black/30 px-3 py-1 rounded-full text-sm font-medium">
        {count}
      </span>
    </div>
  );
};

export default ColumnHeader;
