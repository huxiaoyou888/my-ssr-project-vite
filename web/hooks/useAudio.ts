import { ref } from 'vue';
import useState from '@/hooks/useState';
import useEffect from '@/hooks/useEffect';

export default function useAudio(src: any) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(src);
        setAudio(audio);
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    return audio;
}
