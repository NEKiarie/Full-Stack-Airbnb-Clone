"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../Navbar/Categories"
import CategoryInput from "../Inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountrySelect from "../Inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../Inputs/Counter"


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {


    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)



    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathRoomCount: 1,
            imageSrc: "",
            price: 1,
            title: '',
            description: '',
        }
    })


    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')

    const map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,

        })
    }



    //Back steps
    const onBack = () => {
        setStep((value) => value - 1)
    }

    //Forward steps
    const onNext = () => {
        setStep((value) => value + 1)
    }


    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create"
        }
        return "Next"
    }, [step])



    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return "Back"
    }, [step])


    // STEP 1[CATEGORY STEP]
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of this best describes your place?"
                subtitle="Pick a category" />
            <div className="grid 
               grid-cols-1 
               md:grid-cols-2
               gap-3
               max-h-[50vh]
               overflow-y-auto
               ">
                {categories.map((item) => (
                    <div key={item.label}
                        className="span-col-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon} />
                    </div>
                ))}
            </div>
        </div>
    )

    //STEP 2 [LOCATION STEP]

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!" />

                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                /> 

                {/* <Map center={location?.latlng} /> */}


            </div>
        )
    }

    //STEP 3: INFO

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basic information about your place"
                    subtitle="What amenities do you have?"
                />
                <Counter title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)} />
                <hr />
                <Counter title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)} />
                <hr />
                <Counter title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)} />
            </div>

        )

    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            title="Airbnb your home!"
            body={bodyContent} />
    )
}

export default RentModal