const SearchBar = ({ onSearch, onClear }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by code or URL..."
          onChange={handleSearch}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
        <button
          onClick={onClear}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
