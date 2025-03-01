'use client';

import React, { useState, useEffect, useRef } from 'react';
import nlp from 'compromise';
import { RiChatAiFill } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import knowledgeBaseData from '../data/knowledgeBase.json';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('en');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop =
                chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const initialMessages = [
            {
                text:
                    language === 'es'
                        ? '¡Hola! Soy un chatbot. ¿En qué puedo ayudarte? Escribe "ayuda" o "help" si no sabes qué preguntar.'
                        : 'Hello! I am a chatbot. How can I help you? Type "help" if you don\'t know what to ask.',
                sender: 'bot',
            },
        ];
        setMessages(initialMessages);
    }, [language]);

    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userInput.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: userInput, sender: 'user' },
            ]);
            handleBotReply(userInput);
            setUserInput('');
        }
    };

    const extractKeywords = (text, language) => {
        const doc = nlp(text);
        const docData = doc.json();

        let keywords = [];
        docData.forEach((sentence) => {
            sentence.terms.forEach((term) => {
                if (term.normal && term.normal.trim() !== '') {
                    keywords.push(term.normal);
                }
            });

            if (sentence.ngrams) {
                ['unigrams', 'bigrams', 'trigrams'].forEach((gramType) => {
                    if (sentence.ngrams[gramType]) {
                        keywords = keywords.concat(sentence.ngrams[gramType]);
                    }
                });
            }
        });

        keywords = [...new Set(keywords)];

        const stopWords = {
            es: [
                'que',
                'cuál',
                'cual',
                'es',
                'su',
                'de',
                'la',
                'el',
                'los',
                'las',
                'un',
                'una',
                'unos',
                'unas',
                'y',
                'o',
                'pero',
                'si',
                'no',
                'me',
                'te',
                'se',
                'nos',
                'os',
                'le',
                'les',
                'lo',
                'la',
                'los',
                'las',
                'qué',
                'más',
                'a',
                'con',
                'mi',
                'para',
                'como',
                'al',
                'del',
                'ha',
            ],
            en: [
                'the',
                'a',
                'an',
                'of',
                'and',
                'or',
                'to',
                'for',
                'in',
                'on',
                'at',
                'is',
                'are',
                'was',
                'were',
                'be',
                'been',
                'being',
                'have',
                'has',
                'had',
                'do',
                'does',
                'did',
                'my',
                'your',
                'his',
                'her',
                'its',
                'our',
                'their',
                'this',
                'that',
                'these',
                'those',
                'what',
                'which',
                'who',
                'whom',
                'whose',
                'where',
                'when',
                'why',
                'how',
                'it',
                'he',
                'she',
                "i'm",
                'so',
                'by',
            ],
        };

        keywords = keywords.filter(
            (keyword) =>
                keyword.length >= 2 &&
                !(stopWords[language] || []).includes(keyword),
        );
        return keywords;
    };

    const handleBotReply = (userQuestion) => {
        setIsBotTyping(true);

        const lowerCaseUserQuestion = userQuestion.trim().toLowerCase();
        const userKeywords = extractKeywords(lowerCaseUserQuestion, language);

        let bestAnswer = '';
        let bestMatchRatio = 0;
        let foundMatch = false;

        if (
            lowerCaseUserQuestion === 'help' ||
            lowerCaseUserQuestion === 'ayuda'
        ) {
            bestAnswer =
                language === 'es'
                    ? 'Puedes preguntar sobre: trabajo actual, tecnologías, experiencia, habilidades, idiomas, educación.'
                    : 'You can ask about: current job, technologies, experience, skills, languages, education.';
            foundMatch = true;
        } else {
            knowledgeBaseData.knowledgeBase.forEach((entry) => {
                const questions = entry.questions[language];
                if (!questions) return;

                questions.forEach((question) => {
                    const lowerCaseQuestion = question.trim().toLowerCase();
                    const questionKeywords = extractKeywords(
                        lowerCaseQuestion,
                        language,
                    );
                    const intersection = userKeywords.filter((keyword) =>
                        questionKeywords.includes(keyword),
                    );
                    const matchRatio =
                        questionKeywords.length > 0
                            ? intersection.length / questionKeywords.length
                            : 0;

                    if (matchRatio > bestMatchRatio) {
                        bestMatchRatio = matchRatio;
                        bestAnswer = entry.answer[language];
                        foundMatch = true;
                    }
                });
            });
        }

        if (!foundMatch) {
            bestAnswer =
                language === 'es'
                    ? 'Lo siento, no tengo información sobre eso. Prueba con palabras clave como: trabajo, tecnologías, experiencia, habilidades, idiomas, educación.'
                    : "Sorry, I don't have information about that. Try keywords like: job, technologies, experience, skills, languages, education.";
        }

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: bestAnswer, sender: 'bot' },
            ]);
            setIsBotTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    const handleLanguageChange = (value) => {
        setLanguage(value);
        setMessages([
            {
                text:
                    value === 'es'
                        ? '¡Hola! Soy un chatbot. ¿En qué puedo ayudarte? Escribe "ayuda" o "help" si no sabes qué preguntar.'
                        : 'Hello! I am a chatbot. How can I help you? Type "help" if you don\'t know what to ask.',
                sender: 'bot',
            },
        ]);
    };

    return (
        <div className="fixed bottom-5 right-5">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 15,
                        }}
                        className="rounded-full p-3 bg-blue-800 hover:bg-blue-900 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 border border-gray-700"
                    >
                        <RiChatAiFill className="h-7 w-7" />
                    </motion.button>
                </DialogTrigger>
                <AnimatePresence>
                    {isOpen && (
                        <DialogContent className="sm:max-w-[425px] md:max-w-[550px] lg:max-w-[650px] bg-gray-900 rounded-2xl border border-gray-700 shadow-lg text-white">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.2,
                                    ease: 'easeInOut',
                                }}
                            >
                                <DialogHeader className="pt-6 px-6">
                                    <DialogTitle className="text-2xl font-semibold">
                                        {language === 'es'
                                            ? 'Chatbot de Alejandro'
                                            : "Alejandro's Chatbot"}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-400 mt-2">
                                        {language === 'es'
                                            ? 'Pregúntame cualquier cosa sobre Alejandro.'
                                            : 'Ask me anything about Alejandro.'}
                                        <Select
                                            onValueChange={handleLanguageChange}
                                            defaultValue={language}
                                            className="cursor-none"
                                        >
                                            <SelectTrigger className="w-[180px] mt-4 border border-gray-700 bg-gray-900 text-white cursor-none">
                                                <SelectValue
                                                    placeholder={
                                                        language === 'es'
                                                            ? 'Seleccionar Idioma'
                                                            : 'Select Language'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-900 border border-gray-700 cursor-none">
                                                <SelectItem
                                                    className="text-white hover:bg-blue-600 hover:text-white cursor-none"
                                                    value="es"
                                                >
                                                    Español
                                                </SelectItem>
                                                <SelectItem
                                                    className="text-white hover:bg-blue-600 hover:text-white cursor-none"
                                                    value="en"
                                                >
                                                    English
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </DialogDescription>
                                </DialogHeader>
                                <div
                                    ref={chatWindowRef}
                                    className="chat-window overflow-y-auto max-h-[400px] md:max-h-[500px] px-4 py-3 space-y-3"
                                >
                                    <AnimatePresence>
                                        {messages.map((message, index) => {
                                            const variants =
                                                message.sender === 'user'
                                                    ? {
                                                          hidden: {
                                                              opacity: 0,
                                                              x: 20,
                                                          },
                                                          visible: {
                                                              opacity: 1,
                                                              x: 0,
                                                              transition: {
                                                                  type: 'spring',
                                                                  stiffness: 120,
                                                                  damping: 15,
                                                                  delay: 0.1,
                                                              },
                                                          },
                                                          exit: {
                                                              opacity: 0,
                                                              x: -20,
                                                              transition: {
                                                                  duration: 0.2,
                                                                  ease: 'easeOut',
                                                              },
                                                          },
                                                      }
                                                    : {
                                                          hidden: {
                                                              opacity: 0,
                                                              scale: 0.95,
                                                              y: -5,
                                                          },
                                                          visible: {
                                                              opacity: 1,
                                                              scale: 1,
                                                              y: 0,
                                                              transition: {
                                                                  type: 'spring',
                                                                  stiffness: 150,
                                                                  damping: 18,
                                                                  delay: 0.1,
                                                              },
                                                          },
                                                          exit: {
                                                              opacity: 0,
                                                              scale: 0.9,
                                                              y: 10,
                                                              transition: {
                                                                  duration: 0.15,
                                                                  ease: 'easeOut',
                                                              },
                                                          },
                                                      };

                                            return (
                                                <motion.div
                                                    key={index}
                                                    className={`flex items-center ${
                                                        message.sender ===
                                                        'user'
                                                            ? 'justify-end'
                                                            : 'justify-start'
                                                    }`}
                                                    variants={variants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                >
                                                    <div
                                                        className={`flex w-fit max-w-[75%] rounded-xl px-4 py-2 text-white ${
                                                            message.sender ===
                                                            'user'
                                                                ? 'bg-blue-600 rounded-br-none'
                                                                : 'bg-gray-700 rounded-bl-none'
                                                        }`}
                                                    >
                                                        {message.text}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                        {isBotTyping && (
                                            <motion.div
                                                className="flex w-fit max-w-[75%] rounded-xl px-4 py-2 bg-gray-700 text-white mr-auto rounded-bl-none"
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                    y: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 150,
                                                    damping: 18,
                                                }}
                                            >
                                                {language === 'es'
                                                    ? 'Escribiendo...'
                                                    : 'Typing...'}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <DialogFooter className="p-4">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex items-center space-x-2 w-full"
                                    >
                                        <Input
                                            type="text"
                                            value={userInput}
                                            onChange={handleUserInput}
                                            placeholder={
                                                language === 'es'
                                                    ? 'Escribe tu pregunta...'
                                                    : 'Type your question...'
                                            }
                                            className="flex-1 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        />
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 transition-colors"
                                        >
                                            {language === 'es'
                                                ? 'Enviar'
                                                : 'Send'}
                                        </Button>
                                    </form>
                                </DialogFooter>
                            </motion.div>
                        </DialogContent>
                    )}
                </AnimatePresence>
            </Dialog>
        </div>
    );
};

export default ChatBot;
