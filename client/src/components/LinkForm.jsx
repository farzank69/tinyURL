import { useState } from 'react';

const LinkForm = ({ onLinkCreated }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [urlError, setUrlError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const validateCode = (code) => {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUrlError('');
    setCodeError('');

    if (!validateUrl(targetUrl)) {
      setUrlError('Please enter a valid HTTP or HTTPS URL');
      return;
    }

    if (customCode && !validateCode(customCode)) {
      setCodeError('Code must be 6-8 alphanumeric characters');
      return;
    }

    setIsLoading(true);
    try {
      await onLinkCreated(targetUrl, customCode);
      setTargetUrl('');
      setCustomCode('');
    } catch (error) {
      if (error.response?.status === 409) {
        setCodeError('This code is already taken. Please choose another.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTargetUrl('');
    setCustomCode('');
    setUrlError('');
    setCodeError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Target URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            required
          />
          {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
        </div>

        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Code (optional)
          </label>
          <input
            type="text"
            id="customCode"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="e.g., mylink (6-8 alphanumeric characters)"
            pattern="[A-Za-z0-9]{6,8}"
            maxLength="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <p className="text-gray-500 text-xs mt-1">
            Leave blank to auto-generate. Must be 6-8 alphanumeric characters.
          </p>
          {codeError && <p className="text-red-500 text-sm mt-1">{codeError}</p>}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 sm:flex-none bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating...' : 'Create Short Link'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;
