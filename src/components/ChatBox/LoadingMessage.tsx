interface loadingProps {
  loadingMsg: string;
}

function LoadingMessage(props: loadingProps) {
  return (
    <div className="flex justify-center items-center space-x-3">
      <div className="flex  items-center  ">
        <div>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
        <span className=" text-purple-600 text-2xl font-bold ml-2 p-2   ">
          {props.loadingMsg}
        </span>
      </div>
    </div>
  );
}

export default LoadingMessage;
