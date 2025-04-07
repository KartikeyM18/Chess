
interface TitleSectionProps {
    title: string;
    subheading?: string;
    pill?: string;
}


const TitleSection = ({ title, subheading, pill }: TitleSectionProps) => {
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-start sm:items-center">
                {pill &&
                    <div className="rounded-full text-sm p-[1px] bg-gradient-to-r from-blue-500 to-purple-500">
                        <div className="bg-black px-3 py-1 rounded-full text-white">
                            {pill}
                        </div>
                    </div>
                }
                {subheading ? (
                    <>
                        <h2 className="text-left text-3xl font-semibold text-white sm:text-5xl sm:max-w-[750px] sm:text-center">{title}</h2>
                        <p className=" sm:text-center sm:max-w-450px text-purple-300">{subheading}</p>
                    </>
                ) : (
                    <h1 className="text-left text-4xl sm:text-6xl sm:max-w-[850px] sm:text-center font-semibold">
                        {title}
                    </h1>
                )}
            </div>
        </>
    )
}

export default TitleSection
