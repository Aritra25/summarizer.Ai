/* eslint-disable prettier/prettier */
import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionDiv } from "../common/motion-wrapper";

function parsePoint(point: string) {
  const isNumbered = /^\d+\.\s/.test(point);
  const isMainPoint = /^./.test(point);

  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600} - \u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return {
    isNumbered,
    isMainPoint,
    hasEmoji,
    isEmpty,
    point,
  };
}

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[^\S\n]+|[^\S\n]+$/g, "").trim();

  const matches = cleanContent.match(/^(\p{Emoji}\s*)(.*)$/u);

  if (!matches) {
    return null;
  }

  const [, emoji, text] = matches;

  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const EmojiPoint = ({ point, index }: { point: string; index: number }) => {
  const parsed = parseEmojiPoint(point);
  if (!parsed) return null;
  
  return (
    <MotionDiv
      variants={itemVariants}
      key={`point-${index}`}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
        <div className="flex relative items-start gap-3">
          <span className="text-lg lg:text-xl shrink-0 pt-1">{parsed.emoji}</span>
          <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
            {parsed.text}
          </p>
        </div>
      </div>
    </MotionDiv>
  );
};

const RegularPoint = ({ point, index }: { point: string; index: number }) => {
  return (
    <MotionDiv
      variants={itemVariants}
      key={`point-${index}`}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
        <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
          {point}
        </p>
      </div>
    </MotionDiv>
  );
};

export function ContentSection({
  points,
}: {
  points: string[];
}) {
  return (
    <MotionDiv
      variants={containerVariants}
      key={points.join("")}
      initial="hidden"
      whileInView="visible"
      exit={"exit"}
      className="space-y-4"
    >
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji } = parsePoint(point);

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`emoji-${index}`} point={point} index={index} />;
        }
        return <RegularPoint key={`regular-${index}`} point={point} index={index} />;
      })}
    </MotionDiv>
  );
}
