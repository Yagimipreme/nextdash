//import WebSocket from 'ws';

export async function GET(request) {
  const url = new URL(request.url);                        
  const symbol = url.searchParams.get("symbol");

  if (!symbol) {
    return new Response("Symbol needed!", { status: 400 });
  }
  // WebSocket-Verbindung zur Binance API
  const ws = new WebSocket(
    `wss://stream.binance.com/ws/${symbol}@trade`
  );
  console.log(`wss://stream.binance.com/ws/${symbol}@trade`)
  const readableStream = new ReadableStream({
    start(controller) {
      // WebSocket-Ereignisse in den Stream übertragen
      ws.onmessage = (event) => {
        const priceData = JSON.parse(event.data);
        controller.enqueue(
          `data: ${JSON.stringify({ price: parseFloat(priceData.p) })}\n\n`
        );
      };

      ws.onerror = (error) => {
        console.error(`WebSocket error: ${error.message}`);
        console.log(symbol)
        controller.close();
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        controller.close();
      };
    },
  });

  // Geben Sie die SSE-Daten zurück
  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
