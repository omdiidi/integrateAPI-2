import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { useParams } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { MessageThread, NetworkListingWithShop } from "@shared/schema";

export default function NetworkDM() {
  const params = useParams<{ shopId: string; listingId: string }>();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: listing } = useQuery<NetworkListingWithShop>({
    queryKey: ["/api/network/listings", params.listingId],
  });

  const { data: thread, isLoading } = useQuery<MessageThread>({
    queryKey: ["/api/network/messages", params.shopId, params.listingId],
  });

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/network/messages", {
        shopId: params.shopId,
        networkListingId: params.listingId,
        content,
        threadId: thread?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["/api/network/messages", params.shopId, params.listingId] 
      });
      setMessage("");
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread?.messages]);

  const handleSend = () => {
    if (message.trim()) {
      sendMutation.mutate(message.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const title = listing?.shop.name || "Message";
  const subtitle = listing ? `${listing.artist} - ${listing.releaseTitle}` : "";

  return (
    <Layout 
      title={title}
      showBack
      backFallback={`/network/${params.listingId}`}
    >
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        {subtitle && (
          <div className="px-4 py-2 border-b bg-muted/50">
            <p className="text-sm text-muted-foreground truncate" data-testid="text-vinyl-info">
              Re: {subtitle}
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {isLoading && (
            <div className="flex-1 flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoading && thread?.messages.filter(msg => msg.isFromMe).map((msg) => (
            <div
              key={msg.id}
              className="flex justify-end"
            >
              <div
                className="max-w-[80%] rounded-lg px-4 py-2 bg-primary text-primary-foreground"
                data-testid={`message-${msg.id}`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sendMutation.isPending}
              data-testid="input-message"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!message.trim() || sendMutation.isPending}
              data-testid="button-send"
            >
              {sendMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
