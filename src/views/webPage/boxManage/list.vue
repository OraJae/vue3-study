<template>
    <div class="container">
        <!-- 顶部标题栏 -->
        <div class="header">
            <div class="header-content">
                <h1>物品管理系统</h1>
                <!-- 盒子采用下拉框动态选择 -->
                <div class="box-info">
                    <a-select v-model:value="boxId" placeholder="请选择盒子" style="width: 200px">
                        <a-select-option v-for="box in boxes" :key="box.id" :value="box.id">{{ box.name }}</a-select-option>
                    </a-select>
                </div>
            </div>
        </div>

        <!-- 搜索和操作栏 -->
        <a-card class="search-box">
            <Search placeholder="搜索物品名称或标签" allowClear enterButton="搜索" size="" @search="handleSearch" />
        </a-card>

        <!-- 共计 {{ filteredItems.length }} 件物品 -->
        <p class="item-count">共计 {{ filteredItems.length }} 件物品</p>

        <!-- 物品列表 -->
        <div v-if="loading" style="text-align: center; padding: 40px">
            <a-spin />
            <p style="margin-top: 10px">正在加载物品数据...</p>
        </div>

        <div v-else-if="filteredItems.length === 0" class="empty-state">
            <h2>未找到匹配的物品</h2>
            <p>尝试调整搜索条件或添加新物品</p>
        </div>

        <div v-else class="items-container">
            <div v-for="item in filteredItems" :key="item.id" class="item-card">
                <img :src="item.image" :alt="item.name" class="item-image" @click="previewImage(item.image)" />
                <div class="item-content">
                    <h3 class="item-name">{{ item.name }}</h3>
                    <div class="item-tags">
                        <a-tag v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</a-tag>
                    </div>
                </div>
                <div class="item-footer">
                    <EditOutlined @click="editItem(item)" />
                    <DeleteOutlined @click="deleteItem(item)" />
                </div>
            </div>
        </div>

        <!-- 添加/编辑物品对话框 -->
        <a-modal v-model:open="dialogVisible" :title="isEditing ? '编辑物品' : '添加物品'" width="520px" :footer="null">
            <div>
                <a-form labelCol="{ span: 6 }" wrapperCol="{ span: 18 }">
                    <a-form-item label="物品名称">
                        <a-input v-model:value="form.name" placeholder="请输入物品名称"></a-input>
                    </a-form-item>

                    <a-form-item label="物品图片">
                        <a-upload
                            class="avatar-uploader"
                            :show-upload-list="false"
                            :before-upload="beforeImageUpload"
                            :custom-request="handleImageUpload"
                            accept="image/png, image/jpeg, image/jpg"
                        >
                            <img v-if="form.image" :src="form.image" class="avatar" />
                            <div v-else class="avatar-uploader-icon"><PlusOutlined /></div>
                        </a-upload>
                    </a-form-item>

                    <a-form-item label="物品标签">
                        <a-select v-model:value="form.tags" mode="tags" placeholder="请选择或输入标签">
                            <a-select-option v-for="tag in commonTags" :key="tag" :value="tag">{{ tag }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>

                <div class="dialog-footer" style="text-align: right; margin-top: 12px">
                    <a-button @click="dialogVisible = false">取 消</a-button>
                    <a-button type="primary" @click="saveItem">确 定</a-button>
                </div>
            </div>
        </a-modal>

        <!-- 图片预览对话框 -->
        <a-modal v-model:open="imagePreviewVisible" title="图片预览" width="95%" :footer="null">
            <div class="image-preview">
                <img :src="previewImageUrl" class="preview-image" />
            </div>
        </a-modal>
    </div>
</template>

<script setup>
// import { onMounted, ref, reactive, computed } from 'vue';
// import { ElMessage, ElMessageBox } from 'element-plus';
import request from '@/utils/request';
// 占位脚本 — 在这里实现箱子列表的逻辑
// const Search = ref('Search');
const Plus = ref('Plus');
const Loading = ref('Loading');
import { Input, Space } from 'ant-design-vue';
const { Search } = Input;
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';

// 响应式数据
const boxId = ref('');
const items = ref([]);
const filteredItems = ref([]);
const loading = ref(true);
const searchKeyword = ref('');
const dialogVisible = ref(false);
const imagePreviewVisible = ref(false);
const isEditing = ref(false);
const currentItemId = ref(null);
const previewImageUrl = ref('');
const itemFormRef = ref(null);
const boxes = ref([
    { id: 'default-box', name: '默认盒子' },
    { id: 'box-1', name: '盒子 1' },
    { id: 'box-2', name: '盒子 2' },
]);

// 表单数据
const form = reactive({
    name: '',
    image: '',
    tags: [],
});

// 表单验证规则
const rules = {
    name: [{ required: true, message: '请输入物品名称', trigger: 'blur' }],
};

// 常用标签
const commonTags = ['电子', '办公', '日常', '贵重', '厨房', '游戏', '配件'];

// 计算属性
const totalItems = computed(() => items.value.length);

const categoryCounts = computed(() => {
    const counts = {
        electronics: 0,
        office: 0,
        daily: 0,
    };

    items.value.forEach((item) => {
        if (item.tags.includes('电子')) counts.electronics++;
        if (item.tags.includes('办公')) counts.office++;
        if (item.tags.includes('日常')) counts.daily++;
    });

    return counts;
});

// 生命周期
onMounted(() => {
    // 从URL获取boxId参数
    const urlParams = new URLSearchParams(window.location.search);
    boxId.value = urlParams.get('boxId') || 'default-box';

    // 加载物品数据
    loadItems();
});

// 方法
const loadItems = () => {
    request.get('/boxManage/getBoxItems').then((res) => {
        if (res.code === 200) {
            items.value = res.data.map((item) => ({
                ...item,
                tags: item.tags ? item.tags.split(',') : [],
            }));
            filteredItems.value = [...items.value];
        }
        loading.value = false;
    });
};

const handleSearch = (value) => {
    if (!value) {
        filteredItems.value = [...items.value];
        return;
    }

    const keyword = value.toLowerCase();
    filteredItems.value = items.value.filter(
        (item) => item.name.toLowerCase().includes(keyword) || item.tags.some((tag) => tag.toLowerCase().includes(keyword))
    );
};

const openAddDialog = () => {
    isEditing.value = false;
    currentItemId.value = null;
    Object.assign(form, {
        name: '',
        image: '',
        tags: [],
    });
    dialogVisible.value = true;
};

const editItem = (item) => {
    console.log(item)
    isEditing.value = true;
    currentItemId.value = item.id;
    Object.assign(form, {
        name: item.name,
        image: item.image,
        tags: [...item.tags],
    });
    dialogVisible.value = true;
};

const saveItem = () => {
    itemFormRef.value.validate((valid) => {
        if (valid) {
            if (isEditing.value) {
                // 更新物品
                request
                    .post('/boxManage/updateBoxItem', {
                        id: currentItemId.value,
                        name: form.name,
                        image: form.image,
                        tags: form.tags.join(','),
                    })
                    .then((res) => {
                        if (res.code === 200) {
                            loadItems();
                        }
                    });
            } else {
                request
                    .post('/boxManage/addBoxItem', {
                        name: form.name,
                        image: form.image,
                        tags: form.tags.join(','),
                    })
                    .then((res) => {
                        if (res.code === 200) {
                            loadItems();
                        }
                    });
            }

            // 更新过滤后的列表
            handleSearch();
            dialogVisible.value = false;

            ElMessage({
                message: isEditing.value ? '物品更新成功' : '物品添加成功',
                type: 'success',
            });
        }
    });
};

const deleteItem = (item) => {
    ElMessageBox.confirm('确定要删除这个物品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        request
            .post('/boxManage/deleteBoxItem', {
                id: item.id,
            })
            .then((res) => {
                if (res.code === 200) {
                    loadItems();
                    ElMessage({
                        type: 'success',
                        message: '删除成功!',
                    });
                }
            });
    });
};

const beforeImageUpload = (file) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isJPG) {
        ElMessage.error('上传图片只能是 JPG/PNG 格式!');
    }
    if (!isLt10M) {
        ElMessage.error('上传图片大小不能超过 10MB!');
    }
    return isJPG && isLt10M;
};

const handleImageUpload = (file) => {
    form.image = file.file;
    console.log(file);
    const formData = new FormData();
    formData.append('file', file.file); // file 来自 input[type="file"]

    request
        .post('/boxManage/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, // 可选：显示上传进度
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`上传进度: ${percentCompleted}%`);
            },
        })
        .then((res) => {
            if (res.code === 200) {
                form.image = res.data;
            } else {
                ElMessage.error('图片上传失败');
            }
        });
};

const previewImage = (url) => {
    previewImageUrl.value = url;
    imagePreviewVisible.value = true;
};
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #f5f7fa;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 12px;
}

.header {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header h1 {
    font-size: 28px;
    font-weight: 600;
}

.box-info {
    width: auto;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 20px;

    span {
        font-size: 16px;
        margin-right: 8px;
        width: 100px;
    }

    .el-select {
        width: 200px;
        background-color: white;
        border-radius: 4px;
    }
}

.stats-card {
    margin-bottom: 20px;
}

.stat-item {
    text-align: center;
    padding: 10px;
}

.stat-label {
    font-size: 14px;
    color: #909399;
    margin-bottom: 8px;
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #409eff;
}

.search-box {
    margin-bottom: 20px;
    //  padding: 0 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    /deep/ .ant-card-body {
        padding: 20px;
    }
}

.item-count {
    font-size: 14px;
    color: #909399;
    margin-bottom: 8px;
    text-align: right;
}

.items-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    .item-card {
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .item-image {
            width: 100%;
            height: 108px;
            min-height: 108px;
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.3s;
            &:hover {
                transform: scale(1.03);
            }
        }
        .item-content {
            padding: 4px 8px 8px;
            .item-name {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 6px;
                color: #303133;
            }
            .item-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                margin-bottom: 0px;
            }
            .tag {
                background-color: #ecf5ff;
                color: #409eff;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 12px;
                border: none;
            }
        }
    }
}

.item-footer {
    border-top: 1px solid #f0f0f0;
    line-height: 16px;

    .anticon {
        width: 50%;
        margin: 6px 0;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        display: inline-block;

        &:not(:last-child) {
            border-right: 1px solid #f0f0f0;
        }
    }
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #909399;
}

.empty-state h2 {
    margin-bottom: 15px;
    font-weight: 500;
}

.image-preview {
    text-align: center;
}

.preview-image {
    max-width: 100%;
    max-height: 500px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
}

@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
}

.items-container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
</style>
