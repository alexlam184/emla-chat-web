import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useInputMessageStore } from "../../store/store";

export default function FourPanelComicPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstPrompt, setFirstPrompt] = useState("");
  const [secondPrompt, setSecondPrompt] = useState("");
  const [thirdPrompt, setThirdPrompt] = useState("");
  const [forthPrompt, setForthPrompt] = useState("");

  const { setMessage } = useInputMessageStore();

  function closeModel() {
    setIsOpen(false);
  }

  function openModel() {
    setIsOpen(true);
  }

  function handleInputChange(index, value) {
    if (index === 1) {
      setFirstPrompt(value);
    } else if (index === 2) {
      setSecondPrompt(value);
    } else if (index === 3) {
      setThirdPrompt(value);
    } else if (index === 4) {
      setForthPrompt(value);
    }
  }

  function handleSubmit() {
    setMessage(
      `four panel comic strip with each panel as a separate image. No comment balloon in the image. all in the same colorful, Japanese cute , cartoon style .Do not use different art style. Each image depicts a sequential part of the story 
      1. ${firstPrompt}
      2. ${secondPrompt}
      3. ${thirdPrompt} 
      4. ${forthPrompt}`
    );
    closeModel();
  }

  function handleClear() {
    setFirstPrompt("");
    setSecondPrompt("");
    setThirdPrompt("");
    setForthPrompt("");
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModel}
          className="rounded-md bg-lime-500 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-lime-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Four panel comic
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="min-h-[500px] min-w-[900px] w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Four Panel Comic
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-gray-500 text-wrap">
                      Prompts for four panel japanese cute comic: <br />
                      Panel 1: {firstPrompt === "" ? "... " : firstPrompt + " "}
                      <br />
                      Panel 2:{" "}
                      {secondPrompt === "" ? "... " : secondPrompt + " "}
                      <br />
                      Panel 3: {thirdPrompt === "" ? "... " : thirdPrompt + " "}
                      <br />
                      Panel 4: {forthPrompt === "" ? "... " : forthPrompt + " "}
                      <br />
                    </p>
                    <ul className="grid grid-cols-2 grid-rows-2">
                      <li className="flex flex-col p-2">
                        <span>[1] </span>
                        <textarea
                          className=" border-indigo-600 border-2 min-w-[300px] min-h-[150px] rounded-md"
                          value={firstPrompt}
                          onChange={(event) =>
                            handleInputChange(1, event.target.value)
                          }
                        />
                      </li>
                      <li className="flex flex-col p-2">
                        <span>[2] </span>
                        <textarea
                          className=" border-indigo-600 border-2 min-w-[300px] min-h-[150px] rounded-md"
                          value={secondPrompt}
                          onChange={(event) =>
                            handleInputChange(2, event.target.value)
                          }
                        />
                      </li>
                      <li className="flex flex-col p-2">
                        <span>[3]</span>
                        <textarea
                          className=" border-indigo-600 border-2 min-w-[300px] min-h-[150px] rounded-md"
                          value={thirdPrompt}
                          onChange={(event) =>
                            handleInputChange(3, event.target.value)
                          }
                        />
                      </li>
                      <li className="flex flex-col p-2">
                        <span>[4]</span>
                        <textarea
                          className=" border-indigo-600 border-2 min-w-[300px] min-h-[150px] rounded-md"
                          value={forthPrompt}
                          onChange={(event) =>
                            handleInputChange(4, event.target.value)
                          }
                        />
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModel}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
