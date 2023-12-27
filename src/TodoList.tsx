import { Container, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from 'react';

function secondsToHMS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = "";

    if (hours > 0) {
        result += hours + "h ";
    }

    if (minutes > 0 || hours > 0) {
        result += minutes + "m ";
    }

    result += remainingSeconds + "s";

    return result.trim();
}

function getSecondsDifferenceRoundedDown(date1: Date, date2: Date): number {
    const millisecondsDifference = Math.abs(date1.getTime() - date2.getTime());
    const secondsDifference = millisecondsDifference / 1000;
    const secondsRoundedDown = Math.floor(secondsDifference);
    return secondsRoundedDown;
}

const Timer: React.FC<{ index: number; isRun: boolean; startDate: Date; timerList: number[]; setTimerList: React.Dispatch<React.SetStateAction<number[]>> }> = ({
    index,
    isRun,
    startDate,
    timerList,
    setTimerList,
}) => {
    const prevTotal = timerList[index];

    useEffect(() => {
        if (!isRun) { return; }
        const id = setInterval(() => {
            setTimerList((prevTimerList) =>
                prevTimerList.map((timer, i) => (index === i ? prevTotal + getSecondsDifferenceRoundedDown(new Date(), startDate) : timer))
            );
        }, 1000);
        return () => clearInterval(id);
    }, [index, isRun, startDate, setTimerList]);


    return <p>計: {secondsToHMS(timerList[index])}</p>;
};

export const TodoList: React.FC<{ todoList: any; setTodoList: any; typeList: any; setTypeList: any; }> = (props) => {
    const { todoList, setTodoList, typeList, setTypeList } = props;
    const [timeList, setTimeList] = useState<number[]>([]);
    const [isTimerRunningList, setIsTimerRunningList] = useState<boolean[]>([]);
    const [dateList, setDateList] = useState<Date[]>([]);

    useEffect(() => {
        if (todoList.length <= 1) {
            setIsTimerRunningList(Array(todoList.length).fill(false));
            setTimeList(Array(todoList.length).fill(0));
            setDateList(Array(todoList.length).fill(null));
        } else if (isTimerRunningList.length < todoList.length) {
            setIsTimerRunningList([...isTimerRunningList, false]);
            setTimeList([...timeList, 0]);
            setDateList(Array(todoList.length).fill(null));
        }
    }, [todoList.length]);

    const handlePlayClick = (index: number) => {
        setDateList((prev) => prev.map((value, i) => (i === index ? new Date() : value)));
        setIsTimerRunningList((prev) =>
            prev.map((value, i) => (i === index ? !value : value))
        );
    };
    const kosuTime: { [key: string]: number } = {};
    let total = 0;
    return (
        <Container maxWidth='xs'>
            {
                todoList.map((todo: any, index: any) => {
                    // Update kosuTime correctly
                    kosuTime[typeList[index]] = (kosuTime[typeList[index]] || 0) + timeList[index];
                    total += timeList[index];
                    // Use curly braces and return the JSX content
                    return (
                        <div key={index}>
                            {<Timer index={index} isRun={isTimerRunningList[index]} startDate={dateList[index]} timerList={timeList} setTimerList={setTimeList} />}
                            <TextField
                                id='outputTodo'
                                label={typeList[index]}
                                name='outputTodo'
                                variant="outlined"
                                value={todo}
                                onChange={(e) => {
                                    setTodoList(
                                        todoList.map((t: any, i: any) => (index === i ? e.target.value : t))
                                    );
                                }}
                            />
                            <IconButton
                                aria-label='play'
                                size='large'
                                type='button'
                                onClick={() => handlePlayClick(index)}
                            >
                                {!isTimerRunningList[index] ? <PlayArrowIcon fontSize='inherit' /> : <StopIcon fontSize='inherit' />}
                            </IconButton>
                            <IconButton
                                aria-label='delete'
                                size='large'
                                type='button'
                                onClick={() => {
                                    confirmAlert({
                                        title: '削除',
                                        message: '本当に削除しますか？',
                                        buttons: [
                                            {
                                                label: 'はい',
                                                onClick: () =>
                                                    setTodoList(todoList.filter((t: any, i: any) => index !== i)),
                                            },
                                            {
                                                label: 'いいえ',
                                                onClick: () => { },
                                            },
                                        ],
                                    });
                                }}
                            >
                                <DeleteIcon fontSize='inherit' />
                            </IconButton>
                        </div>
                    );
                })
            }
            <p>合計:{secondsToHMS(total)}</p>
            <ul style={{ listStyle: "none" }}>
                {Object.entries(kosuTime).map(([key, value]) => (
                    <li key={key}>
                        ■{key}({secondsToHMS(value)})
                    </li>
                ))}
            </ul>
        </Container>
    );
};