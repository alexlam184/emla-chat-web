interface loadingProps {
  loadingMsg: string;
}

function LoadingMessage(props: loadingProps) {
  return (
    <div className="flex flex-row h-auto w-full justify-center items-center space-x-3">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <span className=" text-purple-600 text-2xl font-bold">
        {props.loadingMsg}
      </span>
    </div>
  );
}

export default LoadingMessage;
