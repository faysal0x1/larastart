const NoteTab = ({ note, setNote, setActiveTab }) => (
    <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex cursor-pointer items-center gap-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            <div className="text-sm">Note</div>
        </div>
        <div className="form pt-4">
      <textarea
          name="form-note"
          id="form-note"
          rows={4}
          placeholder="Add special instructions for your order..."
          className="w-full rounded-md border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={note}
          onChange={(e) => setNote(e.target.value)}
      ></textarea>
        </div>
        <div className="block-button pt-4 pb-6 text-center">
            <button
                className="w-full rounded-lg bg-black px-4 py-3 text-white transition-colors hover:bg-gray-800"
                onClick={() => setActiveTab('')}
            >
                Save
            </button>
            <button
                onClick={() => setActiveTab('')}
                className="relative mt-4 inline-block cursor-pointer text-center text-blue-600 uppercase transition-colors before:absolute before:right-0 before:bottom-0 before:left-0 before:h-px before:bg-blue-600 before:content-[''] hover:text-blue-800"
            >
                Cancel
            </button>
        </div>
    </div>
);

export default NoteTab;