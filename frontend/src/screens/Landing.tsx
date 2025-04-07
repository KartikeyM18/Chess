import { useNavigate } from "react-router-dom"
import TitleSection from "../components/LandingPage/TitleSection";
import { Button } from "@/components/ui/button";
import { TROOPS } from "@/lib/constants";

const Landing = () => {
    const navigate = useNavigate();
    return (
        <>
           

            <div className="px-4 overflow-hidden gap-4 mt-10 sm:flex sm:flex-col sm:justify-center sm:items-center">

                <TitleSection title="Unleash Your Inner Grand-Master With Style" pill="✨ hello there" />

                <div className="bg-white p-[2px] sm:mt-6 mt-8 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 sm:w-[300px]">
                    <Button className="w-full rounded-xl p-6 text-2xl bg-black" onClick={() => {
                        navigate('/game');
                    }}>
                        Play Online
                    </Button>
                </div>

                <div className="w-full sm:w-[650px] mt-6 flex justify-center items-center relative rounded-2xl  ">
                    <div className="absolute top-0 bg-gradient-to-b from-black z-10 left-0 right-0 bottom-[50%]"></div>


                    <img src="chessboard.png" alt="banner" className="object-cover w-full rounded-4xl " />

                    <div className="absolute bottom-0 bg-gradient-to-t from-black z-10 left-0 right-0 top-[50%]"></div>
                </div>

                <div className="overflow-hidden hidden sm:block relative h-[300px]">
                    <div className="flex gap-20 animate-slide-left mb-16">
                        {TROOPS.map((troop, index) => (
                            <div key={index} className=" w-16 h-16">
                                <img src={troop.image} alt={troop.name} className="w-full "/>
                            </div>
                        ))}
                        {TROOPS.map((troop, index) => (
                            <div key={index} className="w-16 h-16">
                                <img src={troop.image} alt={troop.name} className="w-full"/>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-20 animate-slide-right justify-between ">
                        {TROOPS.map((troop, index) => (
                            <div key={index} className="w-16 h-16">
                                <img src={troop.image} alt={troop.name} className="w-full"/>
                            </div>
                        ))}
                        {TROOPS.map((troop, index) => (
                            <div key={index} className="w-16 h-16">
                                <img src={troop.image} alt={troop.name} className="w-full"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Landing
