"use client";

import { useEffect, useRef, useState } from "react";
import { LuPenSquare } from "react-icons/lu";

import useOnClickOutside from "@/hooks/use-on-click-outside";

import Button from "@/components/ui/Button";
import { Options } from "@/components/ui/select";

interface AddNewCategoryProps {
  options: Options[];
  setOptions: React.Dispatch<React.SetStateAction<Options[]>> | undefined;
}

const AddNewCategory = ({ options, setOptions }: AddNewCategoryProps) => {
  const [showAddNewCategory, setShowAddNewCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const addNewCategoryRef = useRef(null);

  const handleAddNewCategory = () => {
    setShowAddNewCategory((currValue) => !currValue);
  };

  const handleAddNewCategorySubmit = () => {
    if (setOptions) {
      const isOptionValue = options.some((option) => {
        return (
          option.label.trim().toLowerCase() === category.trim().toLowerCase()
        );
      });

      if (isOptionValue) {
        setError(`${category} already exists!`);
      } else {
        setOptions((prevState) => [
          ...prevState,
          {
            label: category,
            value: category.toUpperCase(),
          },
        ]);
        setCategory("");
        setShowAddNewCategory(false);
        setError("");
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  useOnClickOutside(addNewCategoryRef, () => setShowAddNewCategory(false));

  useEffect(() => {
    const body = document.body;
    if (showAddNewCategory) {
      body.style.overflow = "hidden";
    }

    // Cleanup on unmount
    return () => {
      body.style.overflow = "";
    };
  }, [showAddNewCategory]);

  return (
    <div className="">
      <Button type="button" onClick={handleAddNewCategory}>
        Add New Category
      </Button>

      {showAddNewCategory && (
        <>
          <div className="backdrop-blur-xl duration-300 pointer-events-none select-none fixed top-0 left-0 bg-primary opacity-90 h-screen w-screen z-40"></div>
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50">
            <div
              ref={addNewCategoryRef}
              className="bg-primary border-2 border-border p-8 rounded-md w-full mx-8 md:w-[600px]"
            >
              <h1 className="mb-10 text-primary-foreground text-xl font-semibold">
                Add New Category
              </h1>
              <div className="w-full flex flex-col items-start gap-4">
                {/* User Inputs -- Category */}
                <label
                  htmlFor="category"
                  className="text-primary-foreground cursor-pointer"
                >
                  Category
                </label>
                <div className="flex items-center w-full relative">
                  <LuPenSquare className="absolute left-2 pointer-events-none h-5 w-5 text-secondary-foreground" />
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={category}
                    onChange={handleOnChange}
                    placeholder="Category"
                    className="w-full h-full py-4 pl-10 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
                  />
                </div>

                {error.length > 0 && (
                  <div className="mb-4 text-destructive italic">{error}</div>
                )}

                <Button
                  type="button"
                  onClick={handleAddNewCategorySubmit}
                  className="w-24"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddNewCategory;
