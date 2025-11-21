import { useState, useEffect } from 'react';
import LinkForm from '../components/LinkForm';
import SearchBar from '../components/SearchBar';
import LinkTable from '../components/LinkTable';
import { getAllLinks, createLink, deleteLink } from '../services/api';
import { showToast } from '../utils/helpers';

const Dashboard = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      setFilteredLinks(
        allLinks.filter(
          (link) =>
            link.code.toLowerCase().includes(query) ||
            link.target_url.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredLinks(allLinks);
    }
  }, [searchQuery, allLinks]);

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const links = await getAllLinks();
      setAllLinks(links);
      setFilteredLinks(links);
    } catch (error) {
      console.error('Error fetching links:', error);
      showToast('Failed to load links', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkCreated = async (targetUrl, customCode) => {
    try {
      await createLink(targetUrl, customCode);
      showToast('Short link created successfully!', 'success');
      await fetchLinks();
    } catch (error) {
      console.error('Error creating link:', error);
      if (error.response?.status !== 409) {
        showToast(error.response?.data?.error || 'Failed to create link', 'error');
      }
      throw error;
    }
  };

  const handleDeleteLink = async (code) => {
    try {
      await deleteLink(code);
      showToast('Link deleted successfully', 'success');
      await fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
      showToast('Failed to delete link', 'error');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LinkForm onLinkCreated={handleLinkCreated} />
      <SearchBar onSearch={setSearchQuery} onClear={handleClearSearch} />

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading links...</p>
        </div>
      ) : allLinks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
          <p className="mt-2 text-gray-600 font-medium">No links yet</p>
          <p className="text-gray-500 text-sm">Create your first short link above!</p>
        </div>
      ) : (
        <LinkTable links={filteredLinks} onDelete={handleDeleteLink} />
      )}
    </div>
  );
};

export default Dashboard;
