import { useState } from "react";
import Modal from "../../components/ui/Modal";
import { useCartStore } from "../../store/cartStore";
import { LuMinus, LuPlus, LuTrash } from "react-icons/lu";
import Button from "./../../components/ui/Button";

const Cartbook = ({ book }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="rounded-lg border p-4 mb-4 shadow-sm border-gray-300 bg-gray-200 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img className="h-20 md:h-32 rounded object-cover" src={book.image} alt={book.title} />
        </div>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-900 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => updateQuantity(book._id, book.quantity - 1)}
            >
              <LuMinus className="text-gray-900" />
            </button>
            <p>{book.quantity}</p>
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-900 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => updateQuantity(book._id, book.quantity + 1)}
            >
              <LuPlus className="text-gray-900" />
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-blue-500">${book.price}</p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-gray-900 hover:text-blue-500">
            {book.title}
          </p>
          <p className="text-sm text-gray-900">{book.description}</p>
          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
              onClick={openDeleteModal}
            >
              <LuTrash size={20} />
            </button>
          </div>
          <Modal
            isOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            title="Are you sure you want to remove this book from your cart?"
            description="Deleting this book will remove it from your cart."
          >
            <div className="flex items-center space-x-3 mt-4">
              <Button
                className="bg-red-700 hover:bg-red-800 p-2 w-full"
                onClick={() => {
                  removeFromCart(book._id);
                  closeDeleteModal();
                }}
              >
                Yes, remove
              </Button>
              <Button
                className="bg-gray-400 hover:bg-gray-500 p-2 w-full"
                onClick={closeDeleteModal}
              >
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Cartbook;
