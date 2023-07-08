import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import itsamatch from "../public/itsamatch.png";
import { Dog } from "@/types/Dog";

interface MatchModalProps {
  match: Dog | null;
  setMatch: (dog: Dog | null) => void;
}

export default function MatchModal({ match, setMatch }: MatchModalProps) {
  return (
    <>
      {match && (
        <Transition.Root show={!!match}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setMatch(null)}
          >
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 backdrop-blur-sm bg-gray-900 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full text-gray-50 items-center justify-center px-5 text-center sm:items-center sm:p-0">
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="w-4/5 mx-auto -translate-y-20">
                    <Image
                      src={itsamatch}
                      alt="It's a match"
                      height={75}
                      width={200}
                      style={{
                        transform: "scale(1.5)",
                        margin: "1.5em auto",
                        position: "relative",
                      }}
                    />
                    <div className="match-container__image">
                      <Image
                        src={match.image.url}
                        alt={match.name}
                        height={200}
                        width={300}
                        style={{ transform: "scale(2)" }}
                      />
                    </div>
                    <div className="dog-card__content__header mt-6 mb-2">
                      {match.name}
                    </div>
                    <div className="mb-6 max-w-xl">{match.description || match.temperament}</div>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-xl font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:text-gray-900 hover:bg-gray-50"
                        onClick={() => setMatch(null)}
                      >
                        WOOF!
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
