import {
  GAME_STATE_KEY,
  GAME_STATS_KEY,
  INVALID_WORDS_KEY,
  LAST_HASH_KEY,
  LAST_SESSION_RESET_KEY,
} from "../utils/constants";
import Modal from "./Modal";
import { useTheme } from "next-themes";
import LocalStorage from "../utils/browser";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// TODO: feature parity with wordle
export default function SettingsModal(props: Props) {
  function handleReset() {
    LocalStorage.removeItem(GAME_STATE_KEY);
    LocalStorage.removeItem(GAME_STATS_KEY);
    LocalStorage.removeItem(INVALID_WORDS_KEY);
    LocalStorage.removeItem(LAST_HASH_KEY);
    LocalStorage.setItem(
      LAST_SESSION_RESET_KEY,
      new Date().getTime().toString()
    );
    window.location.reload();
  }

  const { isOpen, onClose } = props;
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Title>Informasi</Modal.Title>
      <p className="mb-4">
        <strong>Katna</strong> adalah kata harian untuk bahasa daerah Makassar.
        Katna merupakan hasil fork dari{" "}
        <a
          href="https://katla.vercel.app"
          className="text-green-600 hover:text-green-700"
        >
          <strong>Katla</strong>
        </a>{" "}
        yang merupakan <s>imitasi</s> adaptasi dari{" "}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="text-green-600 hover:text-green-700"
        >
          Wordle
        </a>
      </p>
      <div className="flex justify-between py-2 my-2 items-center border-b border-t border-gray-500">
        <p>Dark Theme</p>
        <div
          className={`${
            resolvedTheme === "dark" ? "dark:bg-green-600 " : ""
          } w-10 h-6 flex items-center bg-gray-500 rounded-full px-1`}
          onClick={
            resolvedTheme === "dark"
              ? () => setTheme("light")
              : () => setTheme("dark")
          }
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              resolvedTheme === "dark" ? "translate-x-4" : ""
            }`}
          ></div>
        </div>
      </div>
      <p>
        <h2 className="text-xl font-semibold">Terdapat Masalah?</h2>
        <button
          onClick={handleReset}
          className="text-green-600 hover:text-green-700"
        >
          reset sesi sekarang
        </button>
      </p>
    </Modal>
  );
}
