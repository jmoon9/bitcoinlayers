"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Layer } from "@/components/layer/layerProps";
import { Infrastructure } from "@/components/infrastructure/infrastructureProps";
import Risk from "@/components/layer/layerTableItemRisk";
import TableHeader from "@/components/tables/tableHeader";
import { MobileView, isMobile } from "react-device-detect";
import Link from "next/link";
import { useQueryState } from "nuqs";

type TableTabKey = "Snapshot" | "Type" | "Status" | "TVL";

type TableItem = Layer | Infrastructure;

interface Props {
    data: TableItem[];
    headers: {
        name: string;
        showSorting: boolean;
        filterOptions?: string[];
        mobileLabel: string;
    }[];
}

const isLayer = (item: TableItem): item is Layer => {
    return (item as Layer).layerType !== undefined;
};

const isInfrastructure = (item: TableItem): item is Infrastructure => {
    return (item as Infrastructure).infrastructureType !== undefined;
};

const LayerImage = ({ src, title }: { src: string; title: string }) => {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
        setImageSrc(src);
    }, [src]);

    const handleError = () => {
        setImageSrc("/bitcoinlayers-logo.png");
    };

    return (
        <Image
            src={imageSrc}
            alt={`${title} logo`}
            width={20}
            height={20}
            onError={handleError}
        />
    );
};

const FederationTable = ({ data, headers }: Props) => {
    const [status, setStatus] = useQueryState("status", {
        defaultValue: "Mainnet",
    });
    const [types] = useQueryState<string[]>("type", {
        defaultValue: [],
        parse: (value) => value.split(",").filter(Boolean),
        serialize: (value) => value.join(","),
    });
    const [sortBy, setSortBy] = useQueryState("sortBy", {
        defaultValue: "Name",
    });
    const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
        defaultValue: "asc",
    });

    const [mobileActiveTab, setMobileActiveTab] =
        useState<TableTabKey>("Snapshot");

    const sortAndFilterData = useMemo(() => {
        const sorted = [...data].sort((a, b) => {
            let valueA, valueB;
            switch (sortBy) {
                case "Name":
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
                    break;
                case "Type":
                    valueA = isLayer(a)
                        ? a.layerType
                        : isInfrastructure(a)
                          ? a.infrastructureType
                          : "";
                    valueB = isLayer(b)
                        ? b.layerType
                        : isInfrastructure(b)
                          ? b.infrastructureType
                          : "";
                    break;
                case "Status":
                    valueA = a.live;
                    valueB = b.live;
                    break;
                case "TVL":
                    valueA = isLayer(a)
                        ? parseFloat(a.btcLocked.toString())
                        : -Infinity;
                    valueB = isLayer(b)
                        ? parseFloat(b.btcLocked.toString())
                        : -Infinity;
                    if (isNaN(valueA)) valueA = -Infinity;
                    if (isNaN(valueB)) valueB = -Infinity;
                    break;
                default:
                    return 0;
            }
            if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
            if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        let filtered = sorted;
        if (types.length > 0) {
            filtered = filtered.filter((item) =>
                types.includes(
                    isLayer(item) ? item.layerType : item.infrastructureType,
                ),
            );
        }

        filtered = filtered.filter((item) => {
            if (status === "Mainnet") return item.live === "Mainnet";
            if (status === "Testnet") return item.live !== "Mainnet";
            return true;
        });

        return filtered;
    }, [data, sortBy, sortOrder, types, status]);

    const handleSort = (header: string) => {
        if (sortBy === header) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(header);
            setSortOrder("asc");
        }
    };

    const filteredData = sortAndFilterData;

    const handleMobileTabClick = (tab: TableTabKey) => {
        setMobileActiveTab(tab);
    };

    const mobileTableHeaders = headers.filter(
        (_item) => _item.name === mobileActiveTab || _item.name === "Name",
    );

    return (
        <div className="px-6 lg:px-0 w-full">
            {/* <div className="flex lg:mb-6 justify-center -mt-12 lg:mt-0 relative z-20">
                <div className="justify-start items-start gap-4 inline-flex">
                    <div
                        className={`h-[30px] px-4 py-[5px] rounded-full border-2 justify-center items-center gap-1.5 flex cursor-pointer ${
                            status === "Mainnet"
                                ? "bg-white border-orange-600"
                                : "border-slate-300"
                        }`}
                        onClick={() => setStatus("Mainnet")}
                    >
                        <div
                            className={`text-center text-sm font-medium leading-tight ${
                                status === "Mainnet"
                                    ? "text-orange-600"
                                    : "text-slate-600"
                            }`}
                        >
                            Mainnet
                        </div>
                    </div>
                    <div
                        className={`h-[30px] rounded-full border-2 justify-center items-center gap-1 flex cursor-pointer ${
                            status === "Testnet"
                                ? "bg-white border-orange-600"
                                : "border-slate-300"
                        }`}
                        onClick={() => setStatus("Testnet")}
                    >
                        <div className="grow shrink basis-0 h-[30px] px-4 py-[5px] justify-center items-center gap-1.5 flex">
                            <div
                                className={`text-center text-sm font-medium leading-tight ${
                                    status === "Testnet"
                                        ? "text-orange-600"
                                        : "text-slate-600"
                                }`}
                            >
                                Testnet
                            </div>
                        </div>
                    </div>
                    <div
                        className={`h-[30px] rounded-full border-2 justify-center items-center gap-1 flex cursor-pointer ${
                            status === "All"
                                ? "bg-white border-orange-600"
                                : "border-slate-300"
                        }`}
                        onClick={() => setStatus("All")}
                    >
                        <div className="grow shrink basis-0 h-[30px] px-4 py-[5px] justify-center items-center gap-1.5 flex">
                            <div
                                className={`text-center text-sm font-medium leading-tight ${
                                    status === "All"
                                        ? "text-orange-600"
                                        : "text-slate-600"
                                }`}
                            >
                                All
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <MobileView className="flex justify-center">
                <div className="justify-center lg:items-start gap-1 inline-flex py-3">
                    {headers.slice(1).map((_item, ind) => {
                        const isAllowedTab = [
                            "Snapshot",
                            "Type",
                            "Status",
                            "TVL",
                        ].includes(_item.name);
                        return (
                            <div
                                className={`h-[30px] px-4 py-[5px] rounded-full border-2 justify-center items-center gap-1.5 flex cursor-pointer ${
                                    mobileActiveTab === _item.name
                                        ? "bg-white border-orange-600"
                                        : "border-slate-300"
                                }`}
                                onClick={() =>
                                    isAllowedTab &&
                                    handleMobileTabClick(
                                        _item.name as TableTabKey,
                                    )
                                }
                                key={ind}
                            >
                                <div
                                    className={`text-center text-sm font-medium leading-tight ${
                                        mobileActiveTab === _item.name
                                            ? "text-orange-600"
                                            : "text-slate-600"
                                    }`}
                                >
                                    {_item.mobileLabel}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </MobileView>
            <div className="overflow-x-auto bg-lightsecondary rounded-xl mx-auto border border-stroke_tertiary">
                <table className="bg-lightsecondary w-full text-sm text-left rtl:text-right rounded-xl">
                    <TableHeader
                        headers={isMobile ? mobileTableHeaders : headers}
                        onSort={handleSort}
                    />

                    <tbody className="bg-white gap-x-8 border-t border-stroke_tertiary text_table_important">
                        {filteredData.map((item, index) => (
                            <tr
                                className={`cursor-pointer border-b border-stroke_tertiary text_table_important ${
                                    index === filteredData.length - 1 ? "" : ""
                                }`}
                                key={item.slug}
                            >
                                <td className="lg:px-6 px-4 py-4 font-semibold whitespace-nowrap border-r lg:border-r-0 border-stroke_tertiary text_table_important text-table_body">
                                    <Link
                                        href={`/${
                                            isLayer(item)
                                                ? `layers/${item.slug}?open=federation#riskanalysis`
                                                : `infrastructure/${item.slug}`
                                        }`}
                                        className="flex items-center"
                                    >
                                        <LayerImage
                                            src={`/logos/${item.slug}.png`}
                                            title={item.title}
                                        />
                                        <span className="ml-2 truncate lg:word-break-none">
                                            {item.title}
                                        </span>
                                    </Link>
                                </td>
                                {(!isMobile ||
                                    mobileActiveTab === "Snapshot") && (
                                    <td className="relative px-2 border-stroke_tertiary text_table_important">
                                        Coming Soon
                                        {/* {isLayer(item) ? (
                                            item.underReview === "no" ? (
                                                <Risk layer={item} />
                                            ) : (
                                                <div className="lg:px-5 px-1 text_table_important font-light">
                                                    Under review
                                                </div>
                                            )
                                        ) : (
                                            <div className="lg:px-5 px-1 text_table_important">
                                                Not applicable
                                            </div>
                                        )} */}
                                    </td>
                                )}
                                {(!isMobile || mobileActiveTab === "Type") && (
                                    <td className="lg:px-6 px-4 py-3 lg:py-4 border-stroke_tertiary text_table_important">
                                        <Link
                                            href={`/${
                                                isLayer(item)
                                                    ? `layers/${item.slug}/#usecases`
                                                    : `infrastructure/${item.slug}`
                                            }`}
                                        >
                                            {isLayer(item)
                                                ? item.layerType
                                                : isInfrastructure(item)
                                                  ? item.infrastructureType
                                                  : ""}
                                        </Link>
                                    </td>
                                )}
                                {(!isMobile ||
                                    mobileActiveTab === "Status") && (
                                    <td className="lg:px-6 px-4 py-3 lg:py-4 border-stroke_tertiary text_table_important">
                                        <Link
                                            href={`/${
                                                isLayer(item)
                                                    ? `layers/${item.slug}/#usecases`
                                                    : `infrastructure/${item.slug}`
                                            }`}
                                        >
                                            {item.live}
                                        </Link>
                                    </td>
                                )}
                                {(!isMobile || mobileActiveTab === "TVL") && (
                                    <td className="lg:px-6 px-4 py-3 lg:py-4 border-r border-stroke_tertiary text_table_important">
                                        <Link
                                            href={`/${
                                                isLayer(item)
                                                    ? `layers/${item.slug}/#usecases`
                                                    : `infrastructure/${item.slug}`
                                            }`}
                                        >
                                            Coming Soon{/* TODO */}
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FederationTable;
