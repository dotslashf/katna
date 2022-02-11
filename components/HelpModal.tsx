import Link from "./Link";
import Modal from "./Modal";
import Tile from "./Tile";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal(props: Props) {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Title>Cara Bermain</Modal.Title>
      <div className="text-sm">
        <p className="mb-2">
          Tebak <strong className="uppercase">Katna</strong> dalam 6 kesempatan.
          1 hari ada 1 kata rahasia.
        </p>
        <p className="mb-2">
          Setiap tebakan harus merupakan kata valid 5 huruf sesuai dengan kamus
          yang ada pada <Link href="/api/words">disini</Link>. Tekan tombol
          ENTER untuk mengirimkan jawaban
        </p>
        <p className="mb-2">
          Setelah jawaban dikirimkan, warna kotak akan berubah untuk menunjukkan
          seberapa dekat tebakanmu dari kata rahasia
        </p>
        <hr className="dark:border-gray-700 border-gray-500 mb-4" />
        <strong className="text-lg mb-4 block">Contoh</strong>
        <div
          className="grid grid-cols-5 grid-rows-1 gap-1.5 w-64 mb-2"
          style={{ aspectRatio: "6 / 1" }}
        >
          {"nakke".split("").map((char, i) => {
            return (
              <Tile
                key={i}
                char={char}
                state={char === "n" ? "correct" : null}
                delay={0}
              />
            );
          })}
        </div>
        <div className="mb-4">
          Huruf <strong>N</strong> ada dan posisinya sudah tepat
        </div>
        <div
          className="grid grid-cols-5 grid-rows-1 gap-1.5 w-64 mb-2"
          style={{ aspectRatio: "6 / 1" }}
        >
          {"meong".split("").map((char, i) => {
            return (
              <Tile
                key={i}
                char={char}
                state={char === "m" ? "exist" : null}
                delay={0}
              />
            );
          })}
        </div>
        <div className="mb-4">
          Huruf <strong>M</strong> ada namun posisinya belum tepat
        </div>
        <div
          className="grid grid-cols-5 grid-rows-1 gap-1.5 w-64 mb-2"
          style={{ aspectRatio: "6 / 1" }}
        >
          {"larro".split("").map((char, i) => {
            return (
              <Tile
                key={i}
                char={char}
                state={char === "k" ? "wrong" : null}
                delay={0}
              />
            );
          })}
        </div>
        <div className="mb-4">
          Tidak ada huruf <strong>K</strong> di kata rahasia
        </div>
        <hr className="dark:border-gray-700 border-gray-500 mb-4" />
        <p className="font-semibold">
          Akan ada <strong className="uppercase">Katna</strong> baru setiap
          hari!
        </p>
      </div>
    </Modal>
  );
}
