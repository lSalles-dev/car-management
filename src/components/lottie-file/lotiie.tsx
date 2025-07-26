import Lottie from "react-lottie";

interface AnimationProps{
    url: string | any,
    text: string,
    subText?: string
}

export const LottieComponent = ({ url, text, subText }: AnimationProps) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: url,
    };

    return (
        <div className="text-center">
            <Lottie options={defaultOptions} width="20dvw" />
            <div className="flex flex-col gap-4 items-center">
                <p className="font-medium text-xl">{text}</p>
                {subText && <p className="font-medium text-xl">{subText}</p>}
            </div>
        </div>
    )
}
