<template>
    <div>
        <div v-if="image"
            class="flex flex-col gap-3 justify-center items-center border border-dashed max-w-[260px] md:max-w-[250px] mx-auto border-primary rounded-xl p-2 text-center bg-calendarBg">
            <cropper ref="cropper" class="w-auto max-w-[260px] flex-1 mx-auto bg-gray-300 md:max-w-[260px]" v-show="!show"
                :src="image" @change="change" :stencil-props=stencilProps />
            <img v-show="show" class="object-cover w-full flex-1" :src="image" />
            <div v-if="image" class="w-full mt-auto flex justify-center items-center gap-2">
                <button @click="crop"
                    class="w-1/3 border-2 border-origin text-origin rounded-lg  hover:bg-origin hover:text-white duration-300">
                    {{ $t('crop') }}
                </button>
                <button @click="image = null"
                    class="w-1/3 border-2 border-red-400 text-red-400 rounded-lg  hover:bg-red-400 hover:text-white duration-300">
                    {{ $t('delete') }}
                </button>
            </div>
        </div>
        <div v-else
            class="flex flex-col justify-center items-center min-w-full min-h-[260px] border mx-auto border-dashed border-primary rounded-xl p-2 text-center bg-calendarBg relative">
            <img v-if="retrieve" :src="img_link" class="md:min-h-[200px] w-full mb-10 mx-auto" alt="" />
            <img v-else class="object-cover w-full text-xs" :src="img_link" alt="" />
            <div class="absolute bottom-2 w-full px-4">
                <button @click="$refs.file.click()"
                    class="border-2 py-0.5 border-origin text-origin w-full rounded-lg hover:bg-origin hover:text-white duration-300">
                    <span class="button">
                        <input type="file" ref="file" class="hidden" @change="uploadImage($event)" accept="image/*" />
                        {{ $t('upload_photo') }}
                    </span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
    props: {
        imgLink: {
            type: String,
            required: false,
            default: ''
        },
        img_type: ''
    },
    components: {
        Cropper
    },
    data() {
        return {
            user_img_path: 'https://onela.yoursrecord.com/backend/img/user/',
            company_img_path: 'https://onela.yoursrecord.com/backend/img/company/',
            // img_link: '',
            image: '',
            show: false,
            retrieve: true,
            stencilProps: {
                aspectRatio: null
            }
        }
    },
    methods: {
        change({ coordinates, canvas }) {
            console.log(coordinates, canvas);
        },

        crop() {
            const result = this.$refs.cropper.getResult();
            this.image = result.canvas.toDataURL();
            this.show = !this.show;
            const croppedImageData = this.image
            this.$emit('image-cropped', croppedImageData);
        },

        uploadImage(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                    this.retrieve = false;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },

    },

    computed: {
        img_link() {
            return this.img_type === 'company'
                ? this.company_img_path + this.imgLink
                : this.user_img_path + this.imgLink
        }
    },

    mounted() {
        console.log(this.img_link);
    },
}

</script>