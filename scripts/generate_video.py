import os
import subprocess

def main():
    os.makedirs('public/videos', exist_ok=True)
    output_path = 'public/videos/emmy-club-story.mp4'

    images = [
        ("src/assets/images/boxing_wraps_focus_1791741377668.jpg", "DISCIPLINE & PREPARATION", "CHAPTER 01"),
        ("src/assets/images/boxing_training_interior_1791741321076.jpg", "HIGH-PERFORMANCE FACILITY", "CHAPTER 02"),
        ("src/assets/images/heavy_bag_strike_1791741360299.jpg", "STRENGTH, POWER & ENDURANCE", "CHAPTER 03"),
        ("src/assets/images/boxing_pad_training_1791741340189.jpg", "CHAMPIONSHIP RINGCRAFT", "CHAPTER 04"),
        ("src/assets/images/hero_boxer_1791741302613.jpg", "MORE THAN JUST A GYM", "EMMY BOXING CLUB")
    ]

    clip_files = []
    duration = 4.0

    for i, (img_path, title, subtitle) in enumerate(images):
        clip_name = f"/tmp/fast_clip_{i}.mp4"
        clip_files.append(clip_name)

        if not os.path.exists(clip_name):
            vf = (
                f"scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,"
                f"drawbox=y=ih-100:color=black@0.75:width=iw:height=100:t=fill,"
                f"drawbox=y=ih-100:color=0xD3121A:width=6:height=100:t=fill,"
                f"drawtext=text='{subtitle}':fontsize=14:fontcolor=0xD3121A:x=32:y=h-80:box=0,"
                f"drawtext=text='{title}':fontsize=26:fontcolor=white:x=32:y=h-55:box=0,"
                f"fade=t=in:st=0:d=0.35,fade=t=out:st={duration-0.35}:d=0.35,"
                f"format=yuv420p"
            )

            cmd = [
                "ffmpeg", "-y",
                "-loop", "1", "-t", str(duration),
                "-i", img_path,
                "-vf", vf,
                "-c:v", "libx264", "-preset", "ultrafast", "-crf", "23",
                "-r", "24",
                clip_name
            ]
            subprocess.run(cmd, check=True)

    concat_txt = "/tmp/fast_concat.txt"
    with open(concat_txt, "w") as f:
        for c in clip_files:
            f.write(f"file '{c}'\n")

    video_only = "/tmp/fast_video.mp4"
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0",
        "-i", concat_txt,
        "-c", "copy",
        video_only
    ], check=True)

    # Cinematic audio: boxing bell chime at 0s, sub drone, heart rhythm
    audio_file = "/tmp/fast_audio.aac"
    synth_expr = (
        "0.25*sin(2*PI*880*t)*exp(-1.5*mod(t,16)) + "
        "0.12*sin(2*PI*1760*t)*exp(-2.5*mod(t,16)) + "
        "0.08*sin(2*PI*55*t) + "
        "0.10*sin(2*PI*60*t)*exp(-10*mod(t,1.0))"
    )
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"aevalsrc={synth_expr}:s=44100:d=20",
        "-c:a", "aac", "-b:a", "192k",
        audio_file
    ], check=True)

    # Final mux with faststart
    subprocess.run([
        "ffmpeg", "-y",
        "-i", video_only,
        "-i", audio_file,
        "-c:v", "copy",
        "-c:a", "aac",
        "-movflags", "+faststart",
        output_path
    ], check=True)

    print(f"Generated {output_path} successfully. Size: {os.path.getsize(output_path)} bytes")

if __name__ == "__main__":
    main()
