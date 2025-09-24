"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  assignmentReminders: boolean;
  gradeUpdates: boolean;
  courseAnnouncements: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "classmates" | "private";
  showProgress: boolean;
  allowMessages: boolean;
  dataCollection: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "privacy" | "account"
  >("profile");
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    assignmentReminders: true,
    gradeUpdates: true,
    courseAnnouncements: true,
  });
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "classmates",
    showProgress: true,
    allowMessages: true,
    dataCollection: true,
  });

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
    { id: "account", label: "Account", icon: "⚙️" },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and privacy settings
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Profile Settings
              </h2>

              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  S
                </div>
                <div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Change Avatar
                  </button>
                  <p className="text-sm text-gray-600 mt-1">
                    JPG, GIF or PNG. Max size 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Student"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="student@brainwave.academy"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
              </div>

              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === "emailNotifications" &&
                          "Receive notifications via email"}
                        {key === "pushNotifications" &&
                          "Get push notifications on this device"}
                        {key === "assignmentReminders" &&
                          "Reminders for upcoming assignments"}
                        {key === "gradeUpdates" &&
                          "Notifications when grades are posted"}
                        {key === "courseAnnouncements" &&
                          "Announcements from your courses"}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleNotificationChange(
                          key as keyof NotificationSettings
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        value ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Privacy Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Visibility
                  </label>
                  <div className="space-y-3">
                    {[
                      {
                        value: "public",
                        label: "Public",
                        description: "Anyone can see your profile",
                      },
                      {
                        value: "classmates",
                        label: "Classmates Only",
                        description:
                          "Only your classmates can see your profile",
                      },
                      {
                        value: "private",
                        label: "Private",
                        description: "Only you can see your profile",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="visibility"
                          value={option.value}
                          checked={privacy.profileVisibility === option.value}
                          onChange={(e) =>
                            handlePrivacyChange(
                              "profileVisibility",
                              e.target.value
                            )
                          }
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <span className="font-medium text-gray-900">
                            {option.label}
                          </span>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: "showProgress",
                      label: "Show Learning Progress",
                      description: "Allow others to see your course progress",
                    },
                    {
                      key: "allowMessages",
                      label: "Allow Messages",
                      description:
                        "Receive messages from teachers and classmates",
                    },
                    {
                      key: "dataCollection",
                      label: "Data Collection",
                      description:
                        "Help improve Brainwave Academy with anonymous data",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handlePrivacyChange(
                            item.key as keyof PrivacySettings,
                            !privacy[item.key as keyof PrivacySettings]
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          privacy[item.key as keyof PrivacySettings]
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            privacy[item.key as keyof PrivacySettings]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Account Settings
              </h2>

              <div className="space-y-6">
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">
                    Change Password
                  </h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    Update your password to keep your account secure
                  </p>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200">
                    Change Password
                  </button>
                </div>

                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Download Data
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Download a copy of your personal data
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Request Data Export
                  </button>
                </div>

                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <h3 className="font-medium text-red-800 mb-2">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    Permanently delete your account and all associated data
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
