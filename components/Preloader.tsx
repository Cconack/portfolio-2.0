'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out', // smoother, natural ease
                },
            });

            // Animate first line (CLEMENT)
            tl.to('.line-1 span', {
                y: 0,
                stagger: 0.06,
                duration: 0.6,
            });

            // Then animate second line (MENDIE)
            tl.to('.line-2 span', {
                y: 0,
                stagger: 0.06,
                duration: 0.6,
            }, "-=0.3"); // overlaps slightly for smooth flow

            // Exit animation
            tl.to('.preloader-item', {
                delay: 1,
                y: '100%',
                duration: 0.8,
                stagger: 0.12,
                ease: 'power4.inOut',
            })
            .to('.name-text span', { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '<0.5')
            .to(preloaderRef.current, { autoAlpha: 0, duration: 0.6, ease: 'power1.inOut' }, '<0.3');
        },
        { scope: preloaderRef },
    );

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex bg-black overflow-hidden"
        >
            {/* Animated vertical bars */}
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="preloader-item h-full w-[10%] bg-black max-md:w-[20%] max-sm:w-[25%]"
                ></div>
            ))}

            {/* Name text */}
            <div
                className="
                    absolute top-1/2 left-1/2 
                    -translate-x-1/2 -translate-y-1/2 
                    flex flex-col items-center justify-center
                    leading-none text-center font-anton font-bold text-white
                "
            >
                {/* Line 1 - CLEMENT */}
                <p
                    className="
                        name-text line-1 
                        flex 
                        text-[18vw] md:text-[15vw] lg:text-[160px] xl:text-[200px] 
                        overflow-hidden
                    "
                >
                    {['C', 'L', 'E', 'M', 'E', 'N', 'T'].map((char, i) => (
                        <span key={i} className="inline-block translate-y-full">
                            {char}
                        </span>
                    ))}
                </p>

                {/* Line 2 - MENDIE */}
                <p
                    className="
                        name-text line-2 
                        flex 
                        text-[18vw] md:text-[15vw] lg:text-[160px] xl:text-[200px] 
                        overflow-hidden
                    "
                >
                    {['M', 'E', 'N', 'D', 'I', 'E'].map((char, i) => (
                        <span key={i} className="inline-block translate-y-full">
                            {char}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default Preloader;
