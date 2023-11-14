import {
  FinalLiveResult,
  PendingLiveResult,
} from '@/types/TranscriberResponses';
import { toSeconds } from './timeToSeconds';

export const reshape = (
  event: SpeechRecognitionEvent,
): (FinalLiveResult | PendingLiveResult)[] => {
  const { results, resultIndex, timeStamp } = event;

  return Array.from(results).map((result) => {
    const { transcript, confidence } = result[0];
    const { isFinal } = result;

    return {
      alternatives: [
        {
          words: isFinal
            ? transcript.split(' ').map((word, index) => ({
                start_time: toSeconds(0),
                end_time: toSeconds(0),
                word,
                confidence,
                id: `${timeStamp}-${index}`,
                speakerTag: 1,
              }))
            : [],
          transcript,
          confidence,
        },
      ],
      isFinal,
      result_id: resultIndex.toString(),
      resultStartTime: toSeconds(0),
      resultEndTime: toSeconds(0),
      languageCode: 'en-GB',
    };
  });
};
