import React, { useState } from 'react';

function Settings() {
  const [websiteSettings, setWebsiteSettings] = useState({
    logo: '',
    title: '',
    footer: '',
  });

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#000000',
    font: 'Arial',
  });

  const [securitySettings, setSecuritySettings] = useState({
    password: '',
    twoFactorEnabled: false,
  });

  // Example function to handle website settings update
  const updateWebsiteSettings = () => {
    console.log('Website Settings Updated:', websiteSettings);
    // Logic to save website settings
  };

  // Example function to handle theme settings update
  const updateThemeSettings = () => {
    console.log('Theme Settings Updated:', themeSettings);
    // Logic to save theme settings
  };

  // Example function to handle security settings update
  const updateSecuritySettings = () => {
    console.log('Security Settings Updated:', securitySettings);
    // Logic to save security settings
  };

  return (
    <div className="space-y-6">
      {/* Website Settings Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Website Settings</h2>
        <input
          type="text"
          placeholder="Website Logo URL"
          className="border rounded-lg p-2 w-full mb-2"
          value={websiteSettings.logo}
          onChange={(e) => setWebsiteSettings({ ...websiteSettings, logo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Website Title"
          className="border rounded-lg p-2 w-full mb-2"
          value={websiteSettings.title}
          onChange={(e) => setWebsiteSettings({ ...websiteSettings, title: e.target.value })}
        />
        <textarea
          placeholder="Footer Details"
          className="border rounded-lg p-2 w-full mb-2"
          value={websiteSettings.footer}
          onChange={(e) => setWebsiteSettings({ ...websiteSettings, footer: e.target.value })}
        />
        <button onClick={updateWebsiteSettings} className="bg-blue-600 text-white rounded-lg p-2">Save Website Settings</button>
      </div>

      {/* Theme Customization Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Theme Customization</h2>
        <input
          type="color"
          className="border rounded-lg p-2 mb-2"
          value={themeSettings.primaryColor}
          onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Font Family"
          className="border rounded-lg p-2 w-full mb-2"
          value={themeSettings.font}
          onChange={(e) => setThemeSettings({ ...themeSettings, font: e.target.value })}
        />
        <button onClick={updateThemeSettings} className="bg-blue-600 text-white rounded-lg p-2">Save Theme Settings</button>
      </div>

      {/* Security Settings Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
        <input
          type="password"
          placeholder="New Password"
          className="border rounded-lg p-2 w-full mb-2"
          value={securitySettings.password}
          onChange={(e) => setSecuritySettings({ ...securitySettings, password: e.target.value })}
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={securitySettings.twoFactorEnabled}
            onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorEnabled: e.target.checked })}
            className="mr-2"
          />
          <label>Enable Two-Factor Authentication</label>
        </div>
        <button onClick={updateSecuritySettings} className="bg-blue-600 text-white rounded-lg p-2">Save Security Settings</button>
      </div>
    </div>
  );
}

export default Settings;
