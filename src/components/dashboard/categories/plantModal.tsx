import type { CategoryPlantsModalProps } from "@type/dashboard/categoties.type";
import { X } from "lucide-react";

export default function CategoryPlantsModal({
    isOpen,
    categoryName,
    plants,
    loading,
    error,
    onClose,
}: CategoryPlantsModalProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >

            <div
                className="w-full max-w-lg rounded-xl bg-white shadow-xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e1e5de] px-5 py-4">

                    <div>
                        <h2 className="text-lg font-semibold text-[#263126]">
                            {categoryName}
                        </h2>

                        {!loading && !error && (
                            <p className="text-sm text-[#929a91]">
                                {plants.length}{" "}
                                {plants.length === 1
                                    ? "plant"
                                    : "plants"}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#929a91] transition hover:bg-[#f0f4ed] hover:text-[#486344]"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>


                {/* Plant list */}
                <div className="max-h-[400px] overflow-y-auto p-5">

                    {loading && (
                        <p className="py-8 text-center text-sm text-[#7b847a]">
                            Loading plants...
                        </p>
                    )}

                    {!loading && error && (
                        <p className="py-8 text-center text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {!loading && !error && plants.length === 0 && (
                        <p className="py-8 text-center text-sm text-[#929a91]">
                            No plants found in this category.
                        </p>
                    )}

                    {!loading && !error && plants.length > 0 && (

                        <div className="space-y-2">

                            {plants.map((plant) => (

                                <div
                                    key={plant.id}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-[#e1e5de] p-4 transition hover:bg-[#f5f7f3]"
                                >

                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-[#263126]">
                                            {plant.commonName}
                                        </h3>

                                        <p className="mt-1 text-xs italic text-[#929a91]">
                                            {plant.scientificName}
                                        </p>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${plant.verified
                                            ? "bg-[#edf4eb] text-[#486344]"
                                            : "bg-[#f3f3f0] text-[#7b847a]"
                                            }`}
                                    >
                                        {plant.verified
                                            ? "Verified"
                                            : "Unverified"}
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}
