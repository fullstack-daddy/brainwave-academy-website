"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TeacherSettings {
  profile: {
    displayName: string;
    email: string;
    phone: string;
    department: string;
    officeHours: string;
    bio: string;
  };
  notifications: {
    emailMessages: boolean;
    pushMessages: boolean;
    assignmentSubmissions: boolean;
    gradeNotifications: boolean;
    announcementAlerts: boolean;
    parentContacts: boolean;
  };
  preferences: {
    theme: "light" | "dark" | "auto";
    language: string;
    timezone: string;
    weekStart: "monday" | "sunday";
    dateFormat: string;
  };
  grading: {
    defaultGradingScale: "percentage" | "points" | "letter";
    autoSaveGrades: boolean;
    showRubrics: boolean;
    allowRegradeRequests: boolean;
    lateSubmissionPolicy: "accept" | "penalty" | "reject";
  };
  privacy: {
    profileVisibility: "public" | "students" | "private";
    showContactInfo: boolean;
    allowStudentMessages: boolean;
    allowParentMessages: boolean;
    shareCourses: boolean;
  };
}

const initialSettings: TeacherSettings = {
  profile: {
    displayName: "Dr. Sarah Johnson",
    email: "s.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    officeHours: "Mon, Wed 2:00-4:00 PM",
    bio: "Mathematics teacher with 10+ years of experience specializing in algebra and calculus education.",
  },
  notifications: {
    emailMessages: true,
    pushMessages: true,
    assignmentSubmissions: true,
    gradeNotifications: true,
    announcementAlerts: true,
    parentContacts: true,
  },
  preferences: {
    theme: "light",
    language: "English",
    timezone: "America/New_York",
    weekStart: "monday",
    dateFormat: "MM/DD/YYYY",
  },
  grading: {
    defaultGradingScale: "percentage",
    autoSaveGrades: true,
    showRubrics: true,
    allowRegradeRequests: true,
    lateSubmissionPolicy: "penalty",
  },
  privacy: {
    profileVisibility: "students",
    showContactInfo: true,
    allowStudentMessages: true,
    allowParentMessages: true,
    shareCourses: true,
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<TeacherSettings>(initialSettings);
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const updateSettings = (
    category: keyof TeacherSettings,
    key: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setSaveMessage("Settings reset to defaults");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const sections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "grading", label: "Grading", icon: "📊" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-3 ${
                      activeSection === section.id
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={activeSection}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {/* Save Message */}
              {saveMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">✓ {saveMessage}</p>
                </div>
              )}

              {/* Profile Settings */}
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Profile Settings
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.displayName}
                        onChange={(e) =>
                          updateSettings(
                            "profile",
                            "displayName",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) =>
                          updateSettings("profile", "email", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) =>
                          updateSettings("profile", "phone", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        value={settings.profile.department}
                        onChange={(e) =>
                          updateSettings(
                            "profile",
                            "department",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>English</option>
                        <option>History</option>
                        <option>Arts</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Office Hours
                    </label>
                    <input
                      type="text"
                      value={settings.profile.officeHours}
                      onChange={(e) =>
                        updateSettings("profile", "officeHours", e.target.value)
                      }
                      placeholder="e.g., Mon, Wed 2:00-4:00 PM"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={settings.profile.bio}
                      onChange={(e) =>
                        updateSettings("profile", "bio", e.target.value)
                      }
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <label className="font-medium text-gray-900 capitalize">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              Receive notifications for{" "}
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) =>
                              updateSettings(
                                "notifications",
                                key,
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Grading Settings */}
              {activeSection === "grading" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Grading Preferences
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Grading Scale
                      </label>
                      <select
                        value={settings.grading.defaultGradingScale}
                        onChange={(e) =>
                          updateSettings(
                            "grading",
                            "defaultGradingScale",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="points">Points</option>
                        <option value="letter">Letter Grade</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Late Submission Policy
                      </label>
                      <select
                        value={settings.grading.lateSubmissionPolicy}
                        onChange={(e) =>
                          updateSettings(
                            "grading",
                            "lateSubmissionPolicy",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="accept">Accept with no penalty</option>
                        <option value="penalty">Accept with penalty</option>
                        <option value="reject">Do not accept</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(settings.grading)
                      .slice(1, -1)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <label className="font-medium text-gray-900 capitalize">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              {key === "autoSaveGrades" &&
                                "Automatically save grades as you enter them"}
                              {key === "showRubrics" &&
                                "Show grading rubrics to students"}
                              {key === "allowRegradeRequests" &&
                                "Allow students to request grade reviews"}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) =>
                              updateSettings("grading", key, e.target.checked)
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200 font-medium"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleReset}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
