export default function useCloudinaryURL(url, params) {
  // receives a full cloudinary URL and transformation parameters
  // and return the re-assembled url for image display
  // eg: https://res.cloudinary.com/architecturalnetworks/image/upload/v1594101035/ban/img/image_name.jpg"
  // returns: https://res.cloudinary.com/architecturalnetworks/ar_1.5,c_crop,dpr_auto,f_auto,g_center/v1594101035/ban/img/image_name.jpg
  const imagePath = url.split('/').slice(6).join('/')
  return `${process.env.NUXT_ENV_CLOUDINARY_BASE_URL}/${params}/${imagePath}`
}

// const params = 'ar_1.5,c_crop,dpr_auto,f_auto,g_center'
// const url =
//   'https://res.cloudinary.com/architecturalnetworks/image/upload/v1594101035/ban/img/jon-tyson-s2ryvZkG1Rk-unsplash_hzaazv.jpg'
// console.log(useCloudinaryURL(url, params))
