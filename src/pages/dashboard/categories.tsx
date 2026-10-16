import { useCategories } from "@hooks/dashboard/useCategories/useCategories";

import CategoryPlantsModal from "@components/dashboard/categories/plantModal";
import CreateCategoryModal from "@components/dashboard/categories/createCategoryModal";
import EditCategoryModal from "@components/dashboard/categories/editCategoryModal";
import {
    FolderTree,
    Pencil,
    Plus,
    Search,
} from "lucide-react";

export default function Categories() {

    const {
        filteredCategories,

        search,
        setSearch,
        loading,
        error,

        isCategoryPlantsModalOpen,
        selectedCategoryName,
        selectedCategoryPlants,
        loadingCategoryPlants,
        categoryPlantsError,
        openPlantModal,
        closePlantModal,

        isNewCategoryModalOpen,
        isCreating,
        openNewCategoryModal,
        closeNewCategoryModal,
        createNewCategory,

        isEditCategoryModalOpen,
        isUpdating,
        selectedCategory,
        openEditCategoryModal,
        closeEditCategoryModal,
        updateCategory,
    } = useCategories();

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-[#263126]">
                        Categories
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        Organize plants into categories.
                    </p>

                </div>


                <button
                    onClick={openNewCategoryModal}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739]"
                >

                    <Plus className="h-4 w-4" />

                    Add Category

                </button>

            </div>


            {/* Search */}

            <div className="relative max-w-md">

                <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]"
                />

                <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    className="w-full rounded-lg border border-[#e1e5de] bg-white py-2.5 pl-10 pr-4 text-sm text-[#263126] outline-none transition placeholder:text-[#929a91] focus:border-[#486344] focus:ring-2 focus:ring-[#486344]/10"
                />

            </div>


            {/* Loading */}

            {loading && (
                <div className="flex min-h-48 items-center justify-center">
                    <p className="text-sm text-[#7b847a]">
                        Loading categories...
                    </p>
                </div>
            )}


            {/* Error */}

            {!loading && error && (
                <div className="flex min-h-48 items-center justify-center text-center">
                    <div>
                        <p className="text-sm font-medium text-red-600">
                            Failed to load categories
                        </p>

                        <p className="mt-1 text-xs text-[#929a91]">
                            {error}
                        </p>
                    </div>
                </div>
            )}


            {/* Empty */}

            {!loading &&
                !error &&
                filteredCategories.length === 0 && (
                    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-[#e1e5de] bg-white text-center">
                        <FolderTree className="h-10 w-10 text-[#b3c0ae]" />

                        <p className="mt-3 text-sm font-medium text-[#596257]">
                            No categories to display
                        </p>

                        <p className="mt-1 text-xs text-[#929a91]">
                            {search
                                ? "Try adjusting your search."
                                : "Create a category to get started."}
                        </p>
                    </div>
                )}


            {/* Categories */}

            {!loading &&
                !error &&
                filteredCategories.length > 0 && (

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredCategories.map((category) => {

                            const plantCount =
                                category._count.plants +
                                category._count.plantCaches;

                            return (

                                <div
                                    key={category.id}

                                    onClick={() =>
                                        openPlantModal(category)
                                    }

                                    className="relative cursor-pointer rounded-xl border border-[#e1e5de] bg-white p-5 shadow-sm transition hover:shadow-md"
                                >

                                    <div className="flex items-start justify-between gap-3">


                                        {/* Category information */}

                                        <div className="flex min-w-0 items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f4ed]">

                                                <FolderTree className="h-5 w-5 text-[#486344]" />

                                            </div>


                                            <div className="min-w-0">

                                                <h4 className="truncate text-sm font-semibold text-[#263126]">

                                                    {category.name}

                                                </h4>


                                                <p className="mt-1 text-xs text-[#929a91]">

                                                    {plantCount}{" "}

                                                    {plantCount === 1
                                                        ? "plant"
                                                        : "plants"}

                                                </p>

                                            </div>

                                        </div>


                                        {/* Edit */}

                                        <button
                                            type="button"
                                            title="Edit category"
                                            onClick={(event) => {
                                                event.stopPropagation();

                                                openEditCategoryModal(category);
                                            }}
                                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#929a91] transition hover:bg-[#f0f4ed] hover:text-[#486344]"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>

                                    </div>

                                    {category.description && (
                                        <p className="mt-3 line-clamp-2 text-xs text-[#7b847a]">
                                            {category.description}
                                        </p>
                                    )}

                                </div>

                            );

                        })}

                    </div>

                )}


            {/* Category Plants Modal */}

            <CategoryPlantsModal
                isOpen={isCategoryPlantsModalOpen}
                categoryName={selectedCategoryName}
                plants={selectedCategoryPlants}
                loading={loadingCategoryPlants}
                error={categoryPlantsError}
                onClose={closePlantModal}
            />

            <CreateCategoryModal
                isOpen={isNewCategoryModalOpen}
                onClose={closeNewCategoryModal}
                onCreate={createNewCategory}
                isCreating={isCreating}
            />

            <EditCategoryModal
                isOpen={isEditCategoryModalOpen}
                onClose={closeEditCategoryModal}
                onEdit={updateCategory}
                isEditing={isUpdating}
                category={selectedCategory}
            />

        </div>
    );
}
