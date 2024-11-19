"use client";

import React, {ChangeEvent} from "react";
import {useFormContext} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/app/seller/products/components/ImageUpload";

interface MainContentProps {
    onImageError: (errorMessage: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({onImageError}) => {
    const {register, setValue, watch} = useFormContext();
    const images = watch("images") || [];
    const coverImage = watch("coverImage");

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
                    <Select>
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Chọn danh mục"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="dau">Đề xuất danh mục</SelectItem>
                                <SelectItem value="loai1">Dầu</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="productType">
                        Loại sản phẩm <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Chọn loại sản phẩm"/>
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
