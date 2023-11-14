import type { Time } from './Units';

type UUID = string;

type ResponseWord = {
  start_time: Time;
  end_time: Time;
  word: string;
  confidence: number;
  id: UUID;
};

export type FinalLiveResult = {
  alternatives: [
    {
      words: (ResponseWord & {
        speakerTag: number;
      })[];
      transcript: string;
      confidence: number;
    },
  ];
  isFinal: boolean;
  result_id: string;
  resultStartTime: Time;
  resultEndTime: Time;
};

export type PendingLiveResult = {
  alternatives: [
    {
      words: never[];
      transcript: string;
      confidence: number;
    },
  ];
  isFinal: boolean;
  languageCode: string;
  result_id: string;
  resultStartTime: Time;
  resultEndTime: Time;
};
