"use client";

import React, { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import ImageUpload from "@/app/seller/products/components/ImageUpload";

const frameworks = [
    {
        value: "dau",
        label: "Dầu",
    },
    {
        value: "thucPham",
        label: "Thực phẩm",
    },
    {
        value: "nhaDep",
        label: "Nhà đẹp",
    },
    {
        value: "dienMay",
        label: "Điện máy",
    },
];

interface MainContentProps {
    onImageError: (errorMessage: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onImageError }) => {
    const { register, setValue, watch } = useFormContext();
    const images = watch("images") || [];
    const coverImage = watch("coverImage");
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    // Chuyển đổi File[] thành string[] sử dụng URL.createObjectURL
    const imageUrls: string[] = images.map((file: File) => URL.createObjectURL(file));
    const coverImageUrl = coverImage ? URL.createObjectURL(coverImage) : null;

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const totalImages = images.length + newFiles.length;

        if (totalImages > 5) {
            onImageError("Bạn chỉ có thể tải lên tối đa 5 hình ảnh.");
            return;
        }

        setValue("images", [...images, ...newFiles]);
    };

    const handleCoverImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        setValue("coverImage", files[0]); // Lấy tệp đầu tiên
    };

    return (
        <div className="space-y-6">
            {/* Tên sản phẩm */}
            <div>
                <Label htmlFor="productName">
                    Tên sản phẩm <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                    <Input
                        id="productName"
                        placeholder="Dầu đậu nành Simplus"
                        className="mt-2"
                        {...register("productName")}
                    />
                    <div
                        className="absolute inset-y-0 right-3 flex items-center text-right text-xs text-gray-400 mt-1">0/255
                    </div>
                </div>
            </div>

            {/* Danh mục sản phẩm và Loại sản phẩm */}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="productCategory">
                        Danh mục sản phẩm <span className="text-red-500">*</span>
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? frameworks.find((framework) => framework.value === value)?.label
                                    : "Chọn danh mục sản phẩm..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Tìm kiếm danh mục..." />
                                <CommandList>
                                    <CommandEmpty>Không tìm thấy danh mục nào.</CommandEmpty>
                                    <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                {framework.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value === framework.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Label htmlFor="productType">
                        Loại sản phẩm <span className="text-red-500">*</span>
                    </Label>
                    <Select {...register("productType")}>
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Chọn loại sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="loai1">Loại 1</SelectItem>
                                <SelectItem value="loai2">Loại 2</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Hình ảnh sản phẩm */}
            <ImageUpload
                images={imageUrls}
                onImageChange={handleImageChange}
                maxImages={5}
            />

            {/* Ảnh bìa */}
            <div>
                <Label>
                    Ảnh bìa <span className="text-red-500">*</span>
                </Label>
                <ImageUpload
                    images={coverImageUrl ? [coverImageUrl] : []}
                    onImageChange={handleCoverImageChange}
                    maxImages={1}
                />
            </div>

            {/* Mô tả sản phẩm */}
            <div>
                <Label htmlFor="productDescription">
                    Mô tả sản phẩm <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                    <Textarea
                        id="productDescription"
                        placeholder="Chọn danh mục"
                        className="mt-2 h-40"
                        {...register("productDescription")}
                    />
                    <div
                        className="absolute inset-y-0 right-3 flex items-end text-right text-xs text-gray-400 mt-1">0/3000
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
