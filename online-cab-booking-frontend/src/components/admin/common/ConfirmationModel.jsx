import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-3">

            <div className="bg-red-100 p-2 rounded-full">

              <AlertTriangle
                className="text-red-600"
                size={24}
              />

            </div>

            <h2 className="text-xl font-bold">
              {title}
            </h2>

          </div>

          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-gray-600 leading-7">
            {message}
          </p>

        </div>

        {/* Footer */}

        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-lg text-white transition ${confirmColor}`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmationModal;