"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SubmissionFormProps {
  assignmentId: string;
  onSubmit: (submission: any) => void;
  onCancel: () => void;
}

export default function SubmissionForm({
  assignmentId,
  onSubmit,
  onCancel,
}: SubmissionFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate submission process
    setTimeout(() => {
      onSubmit({
        assignmentId,
        textAnswer,
        files: files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Submit Assignment
      </h3>

      {/* Text Answer */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Answer
        </label>
        <textarea
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder="Type your answer or paste your work here..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={8}
        />
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attach Files
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📎</div>
            <p className="text-gray-600">
              Click to upload files or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
            </p>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-yellow-800 mb-2">Before submitting:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Review your work for completeness</li>
          <li>• Ensure all files are properly attached</li>
          <li>• Check that your answer addresses all requirements</li>
          <li>• You cannot edit your submission after submitting</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || (!textAnswer.trim() && files.length === 0)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? "Submitting..." : "Submit Assignment"}
        </button>
      </div>
    </motion.div>
  );
}
