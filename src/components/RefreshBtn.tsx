export default function RefreshBtn() {
  const handleRefresh = async () => {
    setLoading(true);
    await fetchData();
    setNewItemsCount(0);
  };

  return (
    <button
      onClick={handleRefresh}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Refresh
    </button>
  );
}

// TODO fix
