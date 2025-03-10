"use client"

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {

    const rounter = useRouter();
    useEffect(() => {
        console.error(error.message);
    }
        , [error]);
    return (
        <div>
            <h1>에러가 발생했습니다.</h1>
            <p>{error.message}</p>
            <button
                onClick={() => { 
                    startTransition(() =>{ //동시에 실행
                        rounter.refresh() //현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
                        reset() // 에러 상태를 초기화, 컴포넌트들을 다시 랜더링
                    });
                }}>다시 시도</button>
        </div >
    );
}