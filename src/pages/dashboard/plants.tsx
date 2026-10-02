import {
    Leaf,
    Pencil,
    Search,
    SlidersHorizontal,
    Trash2,
} from "lucide-react";

import { useState } from "react";

import EditPlantModal from "@components/dashboard/plants/editPlantModal";
import CreatePlantModal from "@components/dashboard/plants/createPlantModal";

import { usePlants } from "@hooks/dashboard/usePlants/usePlants";

export default function Plants() {
    const [filterOpen, setFilterOpen] =
        useState(false);

    const {
        filteredPlants,

        search,
        filter,

        setSearch,
        setFilter,

        loading,
        error,

        activePlant,
        setActivePlant,

        createForm,
        closeCreateModal,
        updateCreateField,
        handleCreatePlant,
        openCreateModal,
        createModalOpen,

        editForm,
        editModalOpen,
        saving,

        openEditModal,
        closeEditModal,

        editingFields,
        changedFields,

        enableFieldEdit,
        saveEditField,
        clearFieldEdit,
        updateEditField,

        saveEdit,
        handleRemovePlantClick
    } = usePlants();

    const filterLabel = {
        all: "All Plants",
        verified: "Verified",
        unverified: "Unverified",
    };

    return (
        <div className="space-y-6">

            {/* Header                                                        */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#263126]">
                        Plant Management
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        View and manage plants in the database.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="cursor-pointer rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739]"
                >
                    Add Plant
                </button>
            </div>

            {/* Plants Card                                                   */}

            <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">

                {/* Search / Filter */}

                <div className="relative z-30 border-b border-[#e8ebe5] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                        {/* Search */}

                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search plants..."
                                className="w-full rounded-lg border border-[#dfe4dc] py-2.5 pl-9 pr-3 text-sm text-black outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                            />
                        </div>

                        {/* Filter */}

                        <div className="relative z-40">
                            <button
                                type="button"
                                onClick={() =>
                                    setFilterOpen(
                                        !filterOpen
                                    )
                                }
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#dfe4dc] bg-white px-4 py-2.5 text-sm font-medium text-[#596257] transition hover:bg-[#f7f9f5] sm:w-auto"
                            >
                                <SlidersHorizontal className="h-4 w-4" />

                                {filterLabel[filter]}
                            </button>

                            {filterOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-[#e1e5de] bg-white shadow-lg">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFilter("all");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${filter === "all"
                                            ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                            : "text-[#596257]"
                                            }`}
                                    >
                                        All Plants
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFilter("verified");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${filter === "verified"
                                            ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                            : "text-[#596257]"
                                            }`}
                                    >
                                        Verified
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFilter("unverified");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${filter === "unverified"
                                            ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                            : "text-[#596257]"
                                            }`}
                                    >
                                        Unverified
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Loading                                                       */}

                {loading && (
                    <div className="flex min-h-64 items-center justify-center">
                        <p className="text-sm text-[#7b847a]">
                            Loading plants...
                        </p>
                    </div>
                )}

                {/* Error                                                         */}
                {!loading && error && (
                    <div className="flex min-h-64 items-center justify-center text-center">
                        <div>
                            <p className="text-sm font-medium text-red-600">
                                Failed to load plants
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Empty                                                         */}

                {!loading &&
                    !error &&
                    filteredPlants.length === 0 && (
                        <div className="flex min-h-64 flex-col items-center justify-center text-center">
                            <Leaf className="h-10 w-10 text-[#b3c0ae]" />

                            <p className="mt-3 text-sm font-medium text-[#596257]">
                                No plants to display
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {search
                                    ? "Try adjusting your search."
                                    : "Plant data will be connected later."}
                            </p>
                        </div>
                    )}

                {/* ============================================================ */}
                {/* Plant List                                                    */}
                {/* ============================================================ */}

                {!loading &&
                    !error &&
                    filteredPlants.length > 0 && (
                        <div className="divide-y divide-[#e8ebe5]">
                            {filteredPlants.map(
                                (plant) => {
                                    const isActive =
                                        activePlant ===
                                        plant.id;

                                    return (
                                        <div
                                            key={plant.id}
                                            className="relative overflow-hidden"
                                        >
                                            {/* Actions */}

                                            <div className="absolute inset-y-0 right-0 flex w-40">

                                                <button
                                                    type="button"
                                                    onClick={(
                                                        event
                                                    ) => {
                                                        event.stopPropagation();

                                                        openEditModal(
                                                            plant
                                                        );
                                                    }}
                                                    className="flex h-full w-20 cursor-pointer items-center justify-center gap-1.5 bg-[#486344] text-white transition hover:bg-[#3d5739]"
                                                >
                                                    <Pencil className="h-4 w-4" />

                                                    <span className="text-xs font-medium">
                                                        Edit
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={(
                                                        event
                                                    ) => {
                                                        event.stopPropagation();

                                                        handleRemovePlantClick(plant);
                                                    }}
                                                    className="flex h-full w-20 cursor-pointer items-center justify-center gap-1.5 bg-[#c65353] text-white transition hover:bg-[#b74747]"
                                                >
                                                    <Trash2 className="h-4 w-4" />

                                                    <span className="text-xs font-medium">
                                                        Delete
                                                    </span>
                                                </button>
                                            </div>

                                            {/* Plant Row */}

                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() =>
                                                    setActivePlant(
                                                        isActive
                                                            ? null
                                                            : plant.id
                                                    )
                                                }
                                                onKeyDown={(
                                                    event
                                                ) => {
                                                    if (
                                                        event.key ===
                                                        "Enter" ||
                                                        event.key ===
                                                        " "
                                                    ) {
                                                        setActivePlant(
                                                            isActive
                                                                ? null
                                                                : plant.id
                                                        );
                                                    }
                                                }}
                                                className={`relative flex cursor-pointer items-center justify-between bg-white p-4 transition-transform duration-300 ease-in-out hover:bg-[#fafbf9] ${isActive
                                                    ? "-translate-x-40"
                                                    : "translate-x-0"
                                                    }`}
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-[#263126]">
                                                        {
                                                            plant.commonName
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs italic text-[#7b847a]">
                                                        {
                                                            plant.scientificName
                                                        }
                                                    </p>
                                                </div>

                                                <span
                                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${plant.verification
                                                        ? "bg-[#edf4eb] text-[#486344]"
                                                        : "bg-[#f3f3f0] text-[#7b847a]"
                                                        }`}
                                                >
                                                    {plant.verification
                                                        ? "Verified"
                                                        : "Unverified"}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
            </div>

            {/* Edit Modal                                                     */}

            {editModalOpen &&
                editForm && (
                    <EditPlantModal
                        plant={editForm}

                        editingFields={
                            editingFields
                        }

                        changedFields={
                            changedFields
                        }

                        saving={saving}

                        onClose={
                            closeEditModal
                        }

                        onEditField={
                            enableFieldEdit
                        }

                        onSaveField={
                            saveEditField
                        }

                        onClearField={
                            clearFieldEdit
                        }

                        onChangeField={
                            updateEditField
                        }

                        onSave={saveEdit}
                    />
                )}

            {createModalOpen && (
                <CreatePlantModal
                    plant={createForm}
                    saving={saving}
                    onClose={closeCreateModal}
                    onChange={updateCreateField}
                    onSave={handleCreatePlant}
                />
            )}
        </div>
    );
}