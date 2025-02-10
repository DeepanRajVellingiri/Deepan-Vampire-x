import { Play, Maximize2 } from 'lucide-react';

interface VideoTutorialProps {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export function VideoTutorial({
  title,
  description,
  videoUrl,
  thumbnailUrl
}: VideoTutorialProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Play className="h-8 w-8" />
          </a>
        </div>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center px-3 py-1 rounded-md bg-black/75 text-white text-sm hover:bg-black/90"
        >
          <Maximize2 className="h-4 w-4 mr-1" />
          Watch in full screen
        </a>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}