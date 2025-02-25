"use client";
import React from "react";

function MainComponent() {
  const [instructions, setInstructions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch("/api/get-mod-instructions", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("指示の取得に失敗しました");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setInstructions(data.steps);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructions();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-8 font-noto-sans">
          Minecraft モッドの導入方法
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin"></div>
            <p className="text-gray-700 dark:text-gray-300 font-noto-sans">
              読み込み中...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-center font-noto-sans">
              {error}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {instructions?.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                    {index + 1}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white font-noto-sans">
                    ステップ {index + 1}
                  </h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-800 dark:text-gray-200 font-noto-sans leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.imageDescription && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-noto-sans">
                        <span className="font-semibold">
                          📸 予定している画像の内容：
                        </span>
                        {step.imageDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2 font-noto-sans">
                注意事項
              </h3>
              <ul className="list-disc list-inside space-y-2 text-blue-800 dark:text-blue-200 font-noto-sans">
                <li>
                  Minecraftのバージョンとモッドのバージョンが合っているか確認してください
                </li>
                <li>
                  モッドを導入する前に、ワールドのバックアップを取ることをお勧めします
                </li>
                <li>
                  複数のモッドを入れる場合は、モッド同士の互換性を確認してください
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;