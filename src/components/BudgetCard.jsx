import React, { useState } from "react";
import { formatNaira } from "../utils/currency";
import { FiChevronDown, FiChevronUp, FiClock } from "react-icons/fi";

const BudgetCard = ({ title, items, onAddItem, onDeleteItem, color }) => {
  const [newItem, setNewItem] = useState({ description: "", amount: "" });
  const [showAllItems, setShowAllItems] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.description && newItem.amount) {
      onAddItem({
        ...newItem,
        amount: parseFloat(newItem.amount),
        createdAt: new Date().toISOString(), // Add timestamp when creating item
      });
      setNewItem({ description: "", amount: "" });
    }
  };

  const handleDelete = (id) => {
    onDeleteItem(id);
  };

  // Sort items by timestamp in descending order (newest first)
  const sortedItems = [...items].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Get only the last 3 items when not showing all
  const displayedItems = showAllItems ? sortedItems : sortedItems.slice(0, 2);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="card p-6">
      <div className={`mb-6 ${color}`}>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Description"
            className="input-field"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              className="input-field"
              value={newItem.amount}
              onChange={(e) =>
                setNewItem({ ...newItem, amount: e.target.value })
              }
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Add Item
            </button>
          </div>
        </div>
      </form>

      <div className="relative">
        <div className="space-y-3">
          {displayedItems.map((item) => (
            <div  key={item.id} className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg" >
              <div 
                key={item.id}
                className="flex justify-between items-center "
              >
                <span className="text-gray-700 dark:text-gray-200">
                  {item.description}
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatNaira(item.amount)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <FiClock className="w-3 h-3 mr-1" />
                {formatTimestamp(item.createdAt)}
              </div>
            </div>
          ))}
        </div>

        {items.length > 3 && (
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className="mt-4 w-full flex items-center justify-center gap-2 p-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            {showAllItems ? (
              <>
                Show Less <FiChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View All ({items.length}) <FiChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Total</span>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatNaira(items.reduce((sum, item) => sum + item.amount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
