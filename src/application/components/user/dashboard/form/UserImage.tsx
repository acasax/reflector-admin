import React, {
  useMemo,
  useRef,
  useState
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import itemPlaceholder from '../../../../../assets/images/user-placeholder.png'

interface IUserImageProps {
  imagesTmp?: string
  onClick: (e: any) => void
  onChange: (image: any) => void
}

const UserImage = ({ imagesTmp, onChange,  onClick }: IUserImageProps) => {

  const [file, setFile]: [string, (f: string) => void] = useState('')
  const fileInput = useRef(null)

  const handlerOnClick = () => {
    fileInput && (fileInput.current as any).click()
  }

  const _onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    console.log(file)
    validity.valid && onChange(file)
    setFile('')
  }

  const image = useMemo(() => imagesTmp && imagesTmp.length ? imagesTmp : itemPlaceholder, [imagesTmp])

  return (
    <div className={'d-flex flex-column align-items-center user-image-part-root w-100'}>
      <div className={'user-photo-title'}>Image</div>
      <div className={'user-image-upload'}>
        <div className={'circle'}>
          <img className={'logo-image'} src={image} alt={'Korisnik'} />
        </div>
        <div className={'upload-button cursor-pointer'} onClick={handlerOnClick}>
          <FontAwesomeIcon className={'font-bigger-1'} icon={faUpload} />
          <input
            ref={fileInput}
            value={file ? file : ''}
            onClick={onClick}
            onChange={_onChange}
            onBlur={onClick}
            type={'file'}
            className={'d-none'}
          />
        </div>
      </div>
    </div>
  )
}

export default UserImage