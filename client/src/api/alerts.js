import Swal from 'sweetalert2'

const baseConfig = {
  confirmButtonColor: '#00b8d9',
  background: '#12151c',
  color: '#e7edf9',
}

export const showSuccessAlert = (title, text) =>
  Swal.fire({
    ...baseConfig,
    icon: 'success',
    title,
    text,
    timer: 1800,
    showConfirmButton: false,
  })

export const showErrorAlert = (title, text) =>
  Swal.fire({
    ...baseConfig,
    icon: 'error',
    title,
    text,
    confirmButtonText: 'Okay',
  })

export const showConfirmAlert = (title, text, confirmButtonText = 'Confirm') =>
  Swal.fire({
    ...baseConfig,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#ff5b88',
  })
