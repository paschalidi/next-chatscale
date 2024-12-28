import Image from "next/image";

export const LogoImage = () => {
  return (
    <Image src={'/logo.svg'} alt={'Rechat - logo'} width={36} height={36}/>)
}