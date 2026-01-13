export default function Card({ photo, flipped, onClick,matched }) {
  return (
    <div
      onClick={onClick}
      className={`w-40 h-40 flex items-center justify-center text-3xl border-2 rounded-lg cursor-pointer
                  ${flipped ? "bg-green-200" : "bg-gray-300"} ${matched?"matched-glow":""}`}
    >
      {flipped ? (
        <img src={photo} alt="card" className="w-40  h-40  bg-top bg-cover rounded " />
      ) : (
        "❓"
      )}
    </div>
  );
}
